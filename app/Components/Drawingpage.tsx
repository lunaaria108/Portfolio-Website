"use client";

import { useEffect, useRef, useState } from "react";

type DrawingPageProps = {
  pageId: number;
};

export default function DrawingPage({
  pageId,
}: DrawingPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [saveStatus, setSaveStatus] = useState("");
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width);
    canvas.height = Math.round(rect.height);

    async function loadDrawing() {
      try {
        const response = await fetch(
          `/api/drawing?pageId=${pageId}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Could not load drawing");
        }

        const { imageData } = await response.json();

        if (!imageData) return;

        const image = new Image();

        image.onload = () => {
          const currentCanvas = canvasRef.current;

          if (!currentCanvas) return;

          const context = currentCanvas.getContext("2d");

          if (!context) return;

          context.drawImage(
            image,
            0,
            0,
            currentCanvas.width,
            currentCanvas.height
          );
        };

        image.src = imageData;
      } catch {
        setSaveStatus("Load failed");
      }
    }

    loadDrawing();
  }, []);

  function getCoordinates(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    return {
      x: (event.clientX - rect.left) * (canvas.width / rect.width),
      y: (event.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function startDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { x, y } = getCoordinates(event);

    isDrawing.current = true;
    canvas.setPointerCapture(event.pointerId);

    context.beginPath();
    context.moveTo(x, y);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { x, y } = getCoordinates(event);

    context.strokeStyle = "#754b2c";
    context.lineWidth = 3;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.lineTo(x, y);
    context.stroke();
  }

  function stopDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!isDrawing.current) return;

    isDrawing.current = false;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    context?.closePath();

    scheduleSave();
  }

  function clearPage(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    context?.clearRect(0, 0, canvas.width, canvas.height);
  }

  async function saveDrawing() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setSaveStatus("Saving...");

    try {
      const imageData = canvas.toDataURL("image/png");

      const response = await fetch("/api/drawing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId,
          imageData,
        }),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      setSaveStatus("Saved!");

      setTimeout(() => {
        setSaveStatus("");
      }, 1500);
    } catch {
      setSaveStatus("Save failed");
    }
  }

  function scheduleSave() {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveDrawing();
    }, 600);
  }

  return (
    <div
      className="relative h-full w-full pointer-events-auto"
      onClick={(event) => event.stopPropagation()}
    >

      <canvas
        ref={canvasRef}
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 h-full w-full cursor-crosshair touch-none pointer-events-auto"
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerCancel={stopDrawing}
      />

      <p className="pointer-events-none absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-[7px] text-[#80532f]">
        {saveStatus}
      </p>
    </div>
  );
}