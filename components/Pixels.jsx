import { twMerge } from "tailwind-merge";

export default function Pixels({ pixelColors, onPixelClick, twClasses = "" }) {
  return (
    <div
      className={twMerge("flex flex-col aspect-square flex-grow", twClasses)}
    >
      {pixelColors.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-grow">
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className={
                "flex-grow border border-black " +
                (color === 1 ? "bg-black" : "bg-white")
              }
              onClick={() => {
                onPixelClick?.(rowIndex, colIndex);
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
