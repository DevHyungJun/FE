"use client";

import { useRef } from "react";

export const useHorizontalScroll = (scrollAmount: number = 250) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollLeft +=
      direction === "left" ? -scrollAmount : scrollAmount;
  };

  const startScrolling = (direction: "left" | "right") => {
    const animate = () => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const stopScrolling = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  return { scrollRef, scroll, startScrolling, stopScrolling };
};
