/* eslint-disable react/prop-types */
const Resizer = ({ handleDrag }) => {
  return (
    <div
      className="w-2 bg-gray-600 cursor-col-resize"
      onMouseDown={() => {
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", handleDrag);
        });
      }}
    >
      {" "}
      <div className="flex justify-center items-center h-full">
        <div className="w-1 bg-gray-400 h-12"></div>
      </div>
    </div>
  );
};

export default Resizer;
