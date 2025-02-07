// src/components/CategoryNode.jsx
import React from "react";
import { motion } from "framer-motion";
import Hexagon from "./Hexagon";

interface CategoryNodeProps {
  x: number;
  y: number;
  size: number;
  color: string;
  name: string;
  isUnlocked: boolean;
  delay: number;
}

const CategoryNode: React.FC<CategoryNodeProps> = ({
  x,
  y,
  size,
  color,
  name,
  isUnlocked,
  delay,
}) => {
  return (
    <motion.g
      initial={{ opacity: 0.2, scale: 0.5 }}
      animate={{
        opacity: isUnlocked ? 1 : 0.2,
        scale: isUnlocked ? 1 : 0.5,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay,
      }}
      className={isUnlocked ? "glow" : ""}
      aria-label={`Category: ${name}`}
      role="button"
      tabIndex={0}
    >
      <Hexagon
        x={x}
        y={y}
        size={size}
        fill="rgba(0,0,0,1)"
        stroke={color}
        strokeWidth={2}
      />
      <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="18">
        {name}
      </text>
    </motion.g>
  );
};

export default CategoryNode;
