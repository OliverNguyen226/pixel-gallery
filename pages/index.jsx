import { useState, useRef } from "react";
import nameGen from "../utils/nameGenerator";
import { useSession, signIn } from "next-auth/react";
import Pixels from "../components/Pixels";
import ToggleButton from "../components/ToggleButton";
import ToastPopup from "../components/ToastPopup";
import axios from "axios";

function createBlankArray(number = 16) {
  return Array(number)
    .fill(0)
    .map(() => Array(number).fill(0));
}

export default function Home() {
  const title = useRef(nameGen());
  const drawingId = useRef();
  const [pixelColors, setPixelColors] = useState(createBlankArray(16));
  const [resetAfterSave, setResetAfterSave] = useState(true);
  const [toastPopup, setToastPopup] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="h-screen py-10 flex flex-col gap-10">
      <div className="flex flex-col items-center justify-around h-1/6">
        <h2 className="text-center text-7xl">Create a new drawing</h2>
        <div className="flex flex-col gap-2 m-2">
          <div className="flex w-full justify-between">
            <p className="font-bold">Art Title:</p>
            <input
              type="text"
              defaultValue={title.current}
              onChange={(e) => (title.current = e.target.value)}
              className="outline-none text-right"
              maxLength="16"
            ></input>
          </div>
          <div className="flex justify-evenly">
            {session?.user ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5"
                onClick={async () => {
                  // save the matrix
                  await axios
                    .post("/api/drawing", {
                      pixels: JSON.stringify(pixelColors),
                      title: title.current,
                    })
                    .then((res) => {
                      drawingId.current = res.data.drawing.id;
                      setToastPopup(true);
                    });
                }}
              >
                Save
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5"
                onClick={() => {
                  signIn();
                }}
              >
                Sign in to save
              </button>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-5"
              onClick={() => {
                setPixelColors(createBlankArray(16));
              }}
            >
              Reset
            </button>
          </div>
          <div className="flex justify-center">
            <ToggleButton
              desc="Reset after save"
              isOn={resetAfterSave}
              onToggle={() =>
                setResetAfterSave((resetAfterSave) => !resetAfterSave)
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col max-h-screen items-center h-5/6">
        <Pixels
          pixelColors={pixelColors}
          onPixelClick={(rowIndex, colIndex) => {
            const newPixelColors = [...pixelColors];
            newPixelColors[rowIndex][colIndex] =
              newPixelColors[rowIndex][colIndex] === 1 ? 0 : 1;
            setPixelColors(newPixelColors);
          }}
        />
      </div>
      {toastPopup && (
        <ToastPopup
          pixelColors={pixelColors}
          drawingId={drawingId.current}
          closePopup={() => {
            setToastPopup(false);
            if (resetAfterSave) {
              setPixelColors(createBlankArray(16));
              title.current = nameGen();
            }
          }}
        />
      )}
    </div>
  );
}
