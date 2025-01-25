"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);

  // We'll keep the card sticky on the right, so it stays in place
  // while the left content scrolls.
  return (
    <div className="min-h-screen w-full flex justify-center relative p-10">
      {/* Left side - variable height, each item is a "section" */}
      <div className="max-w-xl w-full mr-10">
        {content.map((item, index) => {
          return (
            <ScrollSection
              key={index}
              index={index}
              item={item}
              setActiveCard={setActiveCard}
            />
          );
        })}
      </div>

      {/* Right side - sticky and centered */}
      <div
        className={cn(
          // "sticky" so it doesn't scroll away
          // place it in the middle of the viewport
          "hidden lg:block border border-red-500 h-60 w-80 rounded-md  sticky top-1/2 -translate-y-1/2 overflow-hidden",
          contentClassName
        )}
      >
        {/* Show the content of whichever item is 'active' */}
        {content[activeCard]?.content ?? null}
      </div>
    </div>
  );
};

// A child component representing one vertical "section."
function ScrollSection({
  index,
  item,
  setActiveCard,
}: {
  index: number;
  item: {
    title: string;
    description: string;
  };
  setActiveCard: (i: number) => void;
}) {
  // 1) Create a ref for this section
  const ref = useRef(null);

  // 2) useInView with an offset so it triggers near center
  // By default, it triggers when any part is in the viewport.
  // We'll use 'margin' to shift the trigger to the center.
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
  });

  // 3) If in view, setActiveCard to this index
  React.useEffect(() => {
    if (isInView) {
      console.log(index);
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div
      ref={ref}
      // Enough height so it can pass through the center
      className="py-24 flex flex-col justify-center"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0.3 }}
        transition={{ duration: 0.2 }}
        className="text-2xl font-bold text-slate-100"
      >
        {item.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0.3 }}
        transition={{ duration: 0.2 }}
        className="text-kg text-slate-300 max-w-sm mt-10"
      >
        {item.description}
      </motion.p>
    </div>
  );
}
