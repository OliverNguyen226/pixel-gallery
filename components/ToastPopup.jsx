import Router from "next/router";
import Pixels from "./Pixels";

export default function ToastPopup({ pixelColors, drawingId, closePopup }) {
  return (
    <div className="h-full w-full absolute top-0 left-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#7CFC00] flex flex-col gap-2 border-2 border-[#508991] rounded-lg p-10">
        <p className="text-xl">Your drawing has been saved!</p>
        <Pixels pixelColors={pixelColors} />
        <div className="flex items-center justify-between">
          <button
            className="bg-white border border-[#508991] rounded-lg p-2"
            onClick={() => Router.push(`/drawing/${drawingId}`)}
          >
            See your art
          </button>
          <button
            className="bg-white border border-[#508991] rounded-lg p-2"
            onClick={closePopup}
          >
            Continue drawing
          </button>
        </div>
      </div>
    </div>
  );
}
