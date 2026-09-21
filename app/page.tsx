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
    <main className="flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      <div
        className="
          relative
          aspect-[16/9]
          w-full
          max-w-[calc(100vh*16/9)]
          overflow-hidden
        "
      >
        <div className="fixed inset-0 z-[9999] hidden items-center justify-center bg-[#2b1717] p-8 max-[1100px]:flex">
          <div className="max-w-md text-center text-[#d5bd93]">
            <p className="text-xl font-bold">
              Please view on a larger screen
            </p>

            <p className="mt-3 text-sm">
              This interactive portfolio is designed for a laptop or desktop display.
            </p>
          </div>
        </div>

        <img
          src="/sprites/Desk.png"
          alt="Desk"
          className="absolute inset-0 w-full h-full object-cover pixel-art"
        />

          <img
            src="/sprites/Plant.png"
            alt="Plant"
            className="absolute pixel-art"
            style={{
              left: "1%",
              top: "-1%",
              width: "43%",
              height: "auto",
            }}
          />

          <img
            src="/sprites/Candle.gif"
            alt="Candle"
            className="absolute pixel-art"
            style={{
              left: "2%",
              top: "1%",
              width: "20%",
              height: "auto",
            }}
          />

          <img
            src="/sprites/Coffee.gif"
            alt="Coffee"
            className="absolute pixel-art"
            style={{
              left: "1.5%",
              bottom: "64%",
              width: "21%",
              height: "auto",
            }}
          />

        <div
          className={`absolute origin-bottom-right transition-transform duration-200 ${
            isBookHovered
              ? "-translate-y-0.5 scale-[1.005] drop-shadow-[0_0_8px_rgba(255,210,140,0.9)]"
              : ""
          }`}
          style={{
            right: "-3%",
            bottom: "-13%",
          }}
        >
          <Book
            onFrameChange={setBookFrame}
            onHoverChange={setIsBookHovered}
          />
        </div>
 
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
