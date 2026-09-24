"use client";

import { useState, useEffect } from "react";
import Drawingpage from "./Drawingpage";
import { Pixelify_Sans } from "next/font/google";
import { Jacquarda_Bastarda_9 } from "next/font/google";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
});

const jacquarda = Jacquarda_Bastarda_9({
  weight: "400",
  subsets: ["latin"],
});

const FRAME_WIDTH = 480;
const FRAME_HEIGHT = 360;

const OPEN_FRAME = 5;

type BookProps = {
  onOpenChange?: (isOpen: boolean) => void;
  onFrameChange?: (frame: number) => void;
  onHoverChange?: (isHovered: boolean) => void;
};

export default function Book({
  onOpenChange,
  onFrameChange,
  onHoverChange,
}: BookProps) {
  const [frame, setFrame] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTurningPage, setIsTurningPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    // PAGE 0
    {
      left: (
        <div>
          <h1 className={`${jacquarda.className} text-[12px] text-center mb-2`}>
            About Me
          </h1>

          <div className="flex items-center justify-center mb-2">
            <img src="../headshot.jpg" alt="Headshot" className="h-25" />
          </div>

          <p className="text-[6px] leading-relaxed">
            Hello! I'm Luna, a developer with a passion for creating fun, unique, and creative web experiences by combining technology with a love of art.
          </p>
        </div>
      ),

      right: (
        <div>
          <h1 className={`${jacquarda.className} text-[12px] text-center mb-3`}>
            Education
          </h1>

          <h2 className="text-[7px] font-bold">
            University of Georgia
          </h2>

          <h3 className="text-[6px]">
            Major: Bachelor of Science, Computer Science
          </h3>

          <p className="text-[6px]">
            Graduation: December 2026
          </p>

          <p className="text-[6px] mb-5">
            GPA: 3.8/4.0
          </p>

          <h2 className="text-[7px] font-bold">
            Collegiate High at Chattanooga State Community College
          </h2>

          <h3 className="text-[6px]">
            Major: General Associates of Science
          </h3>

          <p className="text-[6px]">
            Graduation: May 2021
          </p>

          <p className="text-[6px] mb-5">
            GPA: 4.0/4.0
          </p>

        </div>

      ),
    },

    // PAGE 1
    {
      left: (
        <div>
          <h1 className={`${jacquarda.className} text-[12px] text-center mb-3`}>
            Experience
          </h1>

          <h2 className="text-[7px] font-bold">
            University of Georgia
          </h2>

          <p className="text-[6px]">
            Peer Learning Assistant, Web Programming
          </p>

          <p className="text-[6px]">
            August 2026 - present
          </p>

          <p className="text-[6px] mt-2">
            Assisted the professor in creating and running in-class assignments focusing on HTML, CSS, JavaScript, and React. Provided guidance and support to students during class, helping them understand web development concepts and troubleshoot coding issues.
          </p>
        </div>
      ),

      right: (
        <div>
          <h2 className="text-[7px] font-bold">
            University of Georgia
          </h2>

          <p className="text-[6px]">
            Desk Assistant, University Housing
          </p>

          <p className="text-[6px]">
            August 2025 - May 2026
          </p>

          <p className="text-[6px] mt-2">
            Helped student residents with lockouts and other housing-related concerns. Provided information about campus resources and helped enforce safety of residence halls.
          </p>
        </div>
      ),
    },

    // PAGE 2
    {
      left: (
        <div>
          <h1 className={`${jacquarda.className} text-[12px] text-center mb-3`}>
            Projects
          </h1>

          <h2 className="text-[7px] font-bold">
            Cinema Booking System
          </h2>

          <p className="text-[6px] mt-1">
            Full-stack cinema booking application built using React and Vite for the frontend and Spring Boot 
            for the backend with a PostgreSQL database. Allowed for users to view current and future movies, 
            favorite movies, book tickets, and view their booking history. Admins could add and remove movies, 
            view bookings, and manage users.
          </p>
        </div>
      ),

      right: (
        <div>
          <h2 className="text-[7px] font-bold">
            Athens Explorers
          </h2>

          <p className="text-[6px] mt-1">
            Full-stack website built using React, Next.js, and MongoDB. Allowed users to browse local hiking trails,
            schedule meetups, and review trails.
          </p>

          <h2 className="text-[7px] font-bold">
            Portfolio Website
          </h2>

          <p className="text-[6px] mt-1">
            Portfolio website styled like a video game, built using React and Next.js. 
            Art was drawn and animated in Aseprite.
          </p>

          <h2 className="text-[7px] font-bold">
            Housewarming Invitation
          </h2>

          <p className="text-[6px] mt-1">
            Invitation website built using React and Next.js. Implemented an RSVP feature that stored RSVP's in a google sheet.
          </p>
        </div>
      ),
    },

    // PAGE 3
    {
      left: (
        <div>
          <h1 className={`${jacquarda.className} text-[12px] text-center mb-3`}>
            Campus Involvement
          </h1>

          <h2 className="text-[7px] font-bold">
            UGA Club Archery
          </h2>

          <p className="text-[6px]">
            Co-President
          </p>

          <p className="text-[6px]">
            August 2025 - May 2026
          </p>

          <p className="text-[6px] mt-2">
            Organized and led weekly practices, managed club finances, and coordinated events and competitions.
             Promoted the club to increase membership and foster a welcoming environment for all skill levels.
          </p>
        </div>
      ),

      right: (
        <div>
          <h1 className={`${jacquarda.className} text-[12px] text-center mb-3`}>
            Skills
          </h1>

          <p className="text-[6px] mb-3">
            Java, C, C++, HTML, CSS, JavaScript, React, Next.js, MongoDB, Unity, WebXR
          </p>

          <h1 className={`${jacquarda.className} text-[12px] text-center mb-3`}>
            Relevant Coursework
          </h1>

          <p className="text-[6px] mb-3">
            Web Programming, Data Structures and Algorithms, Software Engineering, Virtual Reality, Human-Computer Interaction
          </p>
        </div>
      ),
    },

    // PAGE 4
    {
      left: (
        <div>
          <h1 className={`${jacquarda.className} text-[12px] text-center mb-3`}>
            Contact Me
          </h1>

          <p className="text-[6px] mt-2">
            Leave a message...
          </p>

           <div
            className="absolute z-50 pointer-events-auto"
            style={{
              left: "5%",
              top: "35%",
              width: "90%",
              height: "100%",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <Drawingpage pageId={1}/>
          </div>
        </div>
      ),

      right: (
        <div
          className="absolute z-50 pointer-events-auto"
          style={{
            left: "5%",
            top: "5%",
            width: "90%",
            height: "100%",
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <Drawingpage pageId={2}/>
        </div>
      ),
    },
  ];

  const TOTAL_PAGES = pages.length;

  // Open the book
  const handleOpen = () => {
    if (isAnimating || isTurningPage || isOpen) return;

    onHoverChange?.(false);

    setIsOpen(true);
    setIsAnimating(true);
  };

  // Close the book
  const closeBook = () => {
    if (isAnimating || isTurningPage) return;

    setIsOpen(false);
    setIsAnimating(true);
  };

  // Turn to next page
  const nextPage = () => {
    if (!isOpen || isAnimating || isTurningPage) return;

    // Don't go past last page
    if (currentPage >= TOTAL_PAGES - 1) return;

    setIsTurningPage(true);

    const pageTurnFrames = [9, 8, 7, 6];

    pageTurnFrames.forEach((pageFrame, index) => {
      setTimeout(() => {
        setFrame(pageFrame);

        if (index === pageTurnFrames.length - 1) {
          setTimeout(() => {
            setFrame(OPEN_FRAME);
            setCurrentPage((page) => page + 1);
            setIsTurningPage(false);
          }, 120);
        }
      }, index * 120);
    });
  };

  // Turn to previous page
  const previousPage = () => {
    if (!isOpen || isAnimating || isTurningPage) return;

    if (currentPage === 0) {
      closeBook();
      return;
    }

    // Don't go before the first page
    if (currentPage === 0) return;

    setIsTurningPage(true);

    const pageTurnFrames = [6, 7, 8, 9];

    pageTurnFrames.forEach((pageFrame, index) => {
      setTimeout(() => {
        setFrame(pageFrame);

        if (index === pageTurnFrames.length - 1) {
          setTimeout(() => {
            setFrame(OPEN_FRAME);
            setCurrentPage((page) => page - 1);
            setIsTurningPage(false);
          }, 120);
        }
      }, index * 120);
    });
  };

  // Tell page.tsx whenever frame changes
  useEffect(() => {
    onFrameChange?.(frame);
  }, [frame, onFrameChange]);

  // Tell page.tsx when fully opened/closed
  useEffect(() => {
    if (frame === OPEN_FRAME) {
      onOpenChange?.(true);
    }

    if (frame === 0) {
      onOpenChange?.(false);
    }
  }, [frame, onOpenChange]);

  // Opening AND closing animation
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setFrame((currentFrame) => {

        // OPENING
        if (isOpen) {
          if (currentFrame >= OPEN_FRAME) {
            clearInterval(interval);
            setIsAnimating(false);

            return OPEN_FRAME;
          }

          return currentFrame + 1;
        }

        // CLOSING
        else {
          if (currentFrame <= 0) {
            clearInterval(interval);
            setIsAnimating(false);
            setCurrentPage(0);

            return 0;
          }

          return currentFrame - 1;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimating, isOpen]);

  return (
    <div className="relative scale-[2.5] origin-bottom-right">

      {/* BOOK SPRITE */}

      {/* Visible sprite */}
      <div
        className="bg-[url('/sprites/Book_spritesheet.png')] bg-no-repeat [image-rendering:pixelated]"
        style={{
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          backgroundPositionX: `-${frame * FRAME_WIDTH}px`,
        }}
      />
      {!isOpen && !isAnimating && (
        <button
          type="button"
          onClick={handleOpen}
          onMouseEnter={() => onHoverChange?.(true)}
          onMouseLeave={() => onHoverChange?.(false)}
          className="absolute z-30 cursor-pointer border-0 bg-transparent"
          style={{
            left: "245px",
            top: "165px",
            width: "210px",
            height: "165px",
          }}
          aria-label="Open book"
        />
      )}

      {/* PAGE CONTENT */}
      {isOpen && !isAnimating && !isTurningPage && (
        <div className={`absolute inset-0 pointer-events-none ${pixelify.className}`}>

          {/* LEFT PAGE */}
          <div
            className="absolute text-[#4a3325]"
            style={{
              left: "175px",
              top: "92px",
              width: "100px",
              height: "170px",
            }}
          >
            {pages[currentPage]?.left}
          </div>

          {/* RIGHT PAGE */}
          <div
            className="absolute text-[#4a3325]"
            style={{
              left: "300px",
              top: "92px",
              width: "100px",
              height: "170px",
            }}
          >
            {pages[currentPage]?.right}
          </div>

        </div>
      )}

      {/* PAGE CONTROLS */}
      {isOpen && !isAnimating && !isTurningPage && (
        <>
          {/* LEFT PAGE */}
          <button
            onClick={previousPage}
            className="absolute z-10 left-0 top-0 w-1/2 h-full bg-transparent border-0 cursor-pointer"
            aria-label="Previous page"
          />

          {/* RIGHT PAGE */}
          <button
            onClick={nextPage}
            className="absolute z-10 right-0 top-0 w-1/2 h-full bg-transparent border-0 cursor-pointer"
            aria-label="Next page"
          />
        </>
      )}
    </div>
  );
}