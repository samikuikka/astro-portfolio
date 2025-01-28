import React, {
  useRef,
  useState,
  useLayoutEffect,
  type RefCallback,
  useEffect,
} from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "~/lib/utils";

interface StickyScrollItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function StickyScroll({
  content,
  onActiveChange,
}: {
  content: StickyScrollItem[];
  onActiveChange: (index: number) => void;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fillHeight, setFillHeight] = useState(0);

  // Prepare an array of refs, one per item
  useLayoutEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, content.length);
  }, [content.length]);

  // Measure offsets after all sections have been rendered
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const offsets = sectionRefs.current.map((section) => {
      if (!section) return 0;
      const rect = section.getBoundingClientRect();
      // top of section relative to the parent's top
      return rect.top - parentRect.top;
    });

    setSectionOffsets(offsets);
  }, [content.length]);

  // Update the fill height when the active card changes
  useEffect(() => {
    if (sectionOffsets.length === 0) return;
    const newHeight = sectionOffsets[activeCard] ?? 0;
    setFillHeight(newHeight);
  }, [activeCard, sectionOffsets]);

  useEffect(() => {
    onActiveChange(activeCard);
  }, [activeCard, onActiveChange]);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex justify-center px-10 pt-[22vh]"
    >
      {/* LEFT SIDE: The main static line and bullets */}
      <div className="relative mr-10">
        {/* 1) The static vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-neutral-500" />

        {/* 2) The animated fill line */}
        <motion.div
          className="absolute left-2 top-0 w-[2px] bg-purple-500"
          animate={{ height: fillHeight }}
          transition={{ type: "spring", duration: 0.5 }}
        />

        {/* 3) The bullets, each placed at the measured offset */}
        {sectionOffsets.map((offset, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: 0,
              top: offset,
              transform: "translateY(-50%)",
            }}
          >
            <div
              className={cn(
                "h-4 w-4 rounded-full border-2 border-white transition-all",
                idx === activeCard
                  ? "bg-purple-500 scale-125"
                  : "bg-neutral-200"
              )}
            />
          </div>
        ))}
      </div>

      {/* MIDDLE COLUMN: The text sections */}
      <div className="max-w-xl w-full">
        {content.map((item, index) => (
          <ScrollSection
            key={index}
            index={index}
            item={item}
            setActiveCard={setActiveCard}
            // @ts-ignore
            divRef={(el) => (sectionRefs.current[index] = el)}
          />
        ))}
        <div className="pb-[22vh]" />
      </div>

      {/* RIGHT SIDE: skill tree or sticky content */}
      <Card className="hidden lg:block border h-full max-h-2xl w-full max-w-xl rounded-md sticky top-1/2 -translate-y-1/2 overflow-hidden">
        <CardSkeletonContainer>
          <div
            className={cn(
              "border-[rgba(255, 255, 255, 0.1)] rounded-xl border shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group"
            )}
          >
            {content[activeCard]?.content ?? null}
          </div>
        </CardSkeletonContainer>
      </Card>
    </div>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "hidden lg:block h-full w-full mx-auto rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(40,40,40,0.70)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      <div
        className={cn(
          "absolute p-1 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)] inset-0 grid grid-cols-50 grid-rows-50 gap-0.5 pointer-events-none"
        )}
        style={{
          gridTemplateColumns: "repeat(50, 1fr)",
          gridTemplateRows: "repeat(50, 1fr)",
        }}
      >
        {Array.from({ length: 2500 }).map((_, idx) => (
          <div
            key={idx}
            className="w-full h-full bg-[#00010e] opacity-20 rounded-sm"
          />
        ))}
      </div>
      {children}
    </div>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-full rounded-xl z-40",
        className,
        showGradient && "bg-[rgba(40,40,40,0.70)]"
      )}
    >
      {children}
    </div>
  );
};

function ScrollSection({
  index,
  item,
  setActiveCard,
  divRef,
}: {
  index: number;
  item: { title: string; description: string };
  setActiveCard: (i: number) => void;
  divRef: RefCallback<HTMLDivElement>;
}) {
  const isInViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(isInViewRef, {
    margin: "-50% 0px -50% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div
      ref={(el) => {
        divRef(el);
        isInViewRef.current = el;
      }}
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
        className="text-slate-300 max-w-sm mt-10"
      >
        {item.description}
      </motion.p>
    </div>
  );
}
