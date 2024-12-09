/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const ResultModal = ({ results, testCases, testResults, onClose }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#3d3d3d] w-full max-w-2xl rounded-lg shadow-xl p-6 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold mb-4 text-white">
            Compilation Results
          </h2>
  
          <div className="space-y-4">
            <div className="bg-[#2d2d2d] p-4 rounded-md">
              <h3 className="font-bold mb-2 text-white">Compilation Status</h3>
              <p className="text-white">
                <strong>Status:</strong> {results.statusMessage}
              </p>
  
              {results.stderr && (
                <div className="bg-red-900 p-2 rounded mt-2">
                  <strong className="text-white">Error:</strong>
                  <p className="text-red-200">{results.stderr}</p>
                </div>
              )}
            </div>
  
            <div className="bg-[#2d2d2d] p-4 rounded-md">
              <h3 className="font-bold mb-2 text-white">Test Case Results</h3>
              <div className="space-y-3">
                {testCases.map((testCase, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md ${
                      testResults[index] ? "bg-green-900" : "bg-red-900"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white">
                        Test Case {index + 1}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          testResults[index]
                            ? "bg-green-700 text-green-100"
                            : "bg-red-700 text-red-100"
                        }`}
                      >
                        {testResults[index] ? "PASSED" : "FAILED"}
                      </span>
                    </div>
                    <div className="text-white">
                      <p>
                        <strong>Input:</strong> {JSON.stringify(testCase.input)}
                      </p>
                      <p>
                        <strong>Target:</strong> {testCase.target}
                      </p>
                      <p>
                        <strong>Your Output:</strong>
                        {
                          " " + results.stdout
                        }
                      </p>
                      <p>
                        <strong>Expected Output:</strong>{" "}
                        {JSON.stringify(testCase.expectedOutput)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ResultModal
