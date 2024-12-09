import { useState, useRef } from "react";
import { initText } from "../assets/boilerPlate";
import CodeEditor from "../CodeEditor";
import Resizer from "./Resizer";

const DraggableLayout = () => {
  const [dragWidth, setDragWidth] = useState(500);
  const containerRef = useRef();

  const [code, setCode] = useState(initText);

  const handleDrag = (e) => {
    const containerOffset = containerRef.current.getBoundingClientRect().left;
    const newWidth = e.clientX - containerOffset;
    setDragWidth(Math.min(Math.max(newWidth, 200), 700));
  };

  return (
    <div
      ref={containerRef}
      className="flex w-full h-screen overflow-hidden bg-gray-900 text-white"
    >
      {/* Description Section */}
      <div
        className="flex-shrink-0 p-4 bg-gray-800"
        style={{ width: `${dragWidth}px` }}
      >
        <h2 className="text-lg font-bold">Two Sum</h2>
        <p className="mt-2 text-sm text-gray-300">
          Given an array of integers <strong>arr</strong> and an integer target,
          return indices of the two numbers such that they add up to{" "}
          <strong>target</strong>.<br /> You may assume that each input would
          have exactly one solution, and you may not use the same element twice.
          <br /> You have to return the answer in sorted order.
        </p>
        <div className="mt-4">
          <h3 className="font-semibold">Examples:</h3>
          <ul className="mt-2 space-y-2">
            <li className="bg-slate-600 p-5">
              <code>Input: arr = [2,7,11,15], target = 9</code>
              <br />
              Output: <code>[0,1]</code>
            </li>
            <li className="bg-slate-600 p-5">
              <code>Input: arr = [3,2,4], target = 6</code>
              <br />
              Output: <code>[1,2]</code>
            </li>
            <li className="bg-slate-600 p-5">
              <code>Input: arr = [3,3], target = 6</code>
              <br />
              Output: <code>[0,1]</code>
            </li>
          </ul>
        </div>
      </div>

      <Resizer handleDrag={handleDrag} />

      {/* Code Section */}
      <div className="flex-grow p-4 bg-gray-900">
        <h2 className="text-lg font-bold mb-4">Code Editor</h2>
        <CodeEditor code={code} setCode={setCode} />
      </div>
    </div>
  );
};

export default DraggableLayout;