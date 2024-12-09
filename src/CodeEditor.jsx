/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Editor from "react-simple-code-editor";
import ResultModal from "./components/ResultModal";
import Prism from "prismjs";
import axios from "axios";
import { Buffer } from "buffer";
import { Play, Loader2 } from "lucide-react";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

const CodeEditor = ({ code, setCode, handleClick }) => {
  const [editorHeight, setEditorHeight] = useState(200);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const editorRef = useRef();

  const testCases = [
    { input: [2, 7, 11, 15], target: 9, expectedOutput: [0, 1] },
    { input: [3, 2, 4], target: 6, expectedOutput: [1, 2] },
    { input: [3, 3], target: 6, expectedOutput: [0, 1] },
  ];

  useEffect(() => {
    if (editorRef.current) {
      const scrollHeight = editorRef.current.scrollHeight;
      setEditorHeight(Math.max(scrollHeight + 20, 200));
    }
  }, [code]);

  const runCode = async () => {
    setIsRunning(true);
    setResults(null);
    setTestResults([]);
    setShowModal(false);

    try {
      const encodedCode = Buffer.from(code, "utf-8").toString("base64");

      const response = await axios.post("http://localhost:8080/api/cpp", {
        code: encodedCode,
        input: "",
      });

      // Log the raw API response for debugging
      console.log("API Response:", response.data);

      // Extract stdout and ensure it's a valid string
      const rawStdout = response.data.stdout || "";
      console.log("Raw stdout:", rawStdout);

      // Split the output into lines and process each test case
      const outputs = rawStdout.trim().split("\n");

      const testResultsArray = testCases.map((testCase, index) => {
        const rawOutput = outputs[index];
        if (!rawOutput) {
          console.error(`No output for test case ${index}`);
          return false;
        }

        // Process the output for comparison
        const parsedOutput = rawOutput
          .replace(/[\[\]\r\n]/g, "") // Clean unwanted characters
          .split(",") // Split into array
          .map(Number) // Convert to numbers
          .sort((a, b) => a - b); // Sort for comparison

        const expectedOutput = [...testCase.expectedOutput].sort(
          (a, b) => a - b
        );

        return JSON.stringify(parsedOutput) === JSON.stringify(expectedOutput);
      });

      // Update state with results
      setResults({
        statusMessage: "Successfully Compiled",
        stderr: response.data.stderr,
        stdout: rawStdout,
      });
      setTestResults(testResultsArray);
      setShowModal(true);

      if (handleClick) {
        handleClick();
      }
    } catch (error) {
      console.error("Error during API request:", error);
      setResults({
        statusMessage: "Compilation Failed",
        stderr: "An error occurred during compilation",
        stdout: null,
      });
      setShowModal(true);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <>
      <div className="w-full bg-[#2d2d2d]">
        <div className="w-full flex justify-end border-b border-white">
          <button
            className="px-3 py-2 m-1 rounded-md text-white bg-green-600 
              flex items-center space-x-2 hover:bg-green-700 disabled:opacity-50"
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <Loader2 className="animate-spin" /> <span>Running</span>
              </>
            ) : (
              <>
                <Play /> <span>Run</span>
              </>
            )}
          </button>
        </div>

        <div
          className={`overflow-hidden h-[600px] overflow-y-auto bg-[#2d2d2d]`}
          ref={editorRef}
        >
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.cpp, "cpp")
            }
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              backgroundColor: "#2d2d2d",
              color: "#f8f8f2",
            }}
            className={`w-full h-[${editorHeight}px] rounded-md`}
          />
        </div>
      </div>

      {showModal && results && (
        <ResultModal
          results={results}
          testCases={testCases}
          testResults={testResults}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default CodeEditor;
