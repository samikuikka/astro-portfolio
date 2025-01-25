import React, { useRef, useState } from "react";
import { useInView } from "framer-motion";
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

  return (
    <div className="w-full flex justify-center relative px-10 pt-[22vh]">
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

        <div className="pb-[22vh]" />
      </div>
      {/* Right side - sticky and centered */}
      <div
        className={cn(
          "hidden lg:block border border-red-500 h-full max-h-2xl w-full max-w-xl rounded-md  sticky top-1/2 -translate-y-1/2 overflow-hidden",
          contentClassName
        )}
      >
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
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px",
  });

  React.useEffect(() => {
    if (isInView) {
      console.log(index);
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div ref={ref} className="py-24 flex flex-col justify-center">
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
