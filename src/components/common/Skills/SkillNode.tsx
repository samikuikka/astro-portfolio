import React from "react";
import { motion } from "framer-motion";
import Hexagon from "./Hexagon";

interface SkillNodeProps {
  x: number;
  y: number;
  size: number;
  color: string;
  name: string;
  isUnlocked: boolean;
  delay: number;
  level: number;
}

const SkillNode: React.FC<SkillNodeProps> = ({
  x,
  y,
  size,
  color,
  name,
  isUnlocked,
  delay,
  level,
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
      className="group"
      aria-label={`Skill: ${name}, Level: ${level}`}
      role="button"
      tabIndex={0}
    >
      <Hexagon
        x={x}
        y={y}
        size={size}
        fill="rgba(0,0,0,1)"
        stroke={color}
        strokeWidth={1.5}
      />
      <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="12">
        {name}
      </text>
    </motion.g>
  );
};

export default SkillNode;
