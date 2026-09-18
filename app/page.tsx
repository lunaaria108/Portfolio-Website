"use client";

import { useState } from "react";
import Book from "./Components/book";

const LIGHT_FRAME_COUNT = 5;

export default function Home() {
  const [bookFrame, setBookFrame] = useState(0);

  const lightingFrames = [0, 0, 1, 2, 3, 4];
  const lightingFrame = bookFrame <= 5 ? lightingFrames[bookFrame] ?? 0 : 4;
  const [isBookHovered, setIsBookHovered] = useState(false);
  
  return (
    <main className="w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      <div
        className="relative overflow-hidden"
        style={{
          width: "100vw",
          aspectRatio: "16 / 9",
          maxHeight: "100vh",
        }}
      >
        <img
          src="/sprites/Desk.png"
          alt="Desk"
          className="absolute inset-0 w-full h-full object-cover pixel-art"
        />

        <div className="absolute -top-30 -left-25 w-full h-full">
          <img
            src="/sprites/Plant.png"
            alt="Plant"
            className="h-150 w-150 object-cover pixel-art"
          />
        </div>

        <div className="absolute -top-10 -right-280 w-full h-full">
          <img
            src="/sprites/Candle.gif"
            alt="Candle"
            className="h-75 w-75 object-cover pixel-art"
          />
        </div>

        <div className="absolute -bottom-70 -left-5 w-full h-full">
          <img
            src="/sprites/Coffee.gif"
            alt="Coffee"
            className="h-75 w-75 object-cover pixel-art"
          />
        </div>

        <div
          className={`absolute -bottom-25 -right-10 transition-transform duration-200 ${
            isBookHovered
              ? "-translate-y-0.5 scale-[1.005] drop-shadow-[0_0_8px_rgba(255,210,140,0.9)]"
              : ""
          }`}
        >
          <Book
            onFrameChange={setBookFrame}
            onHoverChange={setIsBookHovered}
          />
        </div>

        {/* Lighting overlay */}
        <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none ">
          <img
            src="/sprites/Lighting-sheet.png"
            alt=""
            className="absolute top-0 left-0 h-full max-w-none [image-rendering:pixelated]"
            style={{
              width: `${LIGHT_FRAME_COUNT * 100}%`,
              transform: `translateX(-${
                lightingFrame * (100 / LIGHT_FRAME_COUNT)
              }%)`,
            }}
          />
        </div>
      </div>
    </main>
  );
}
