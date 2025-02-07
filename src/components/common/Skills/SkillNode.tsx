// src/components/SkillNode.tsx

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
  logo?: string;
  onClick?: () => void; // Add onClick prop
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
  logo,
  onClick, // Destructure onClick
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
      className="group cursor-pointer" // Add cursor-pointer for UX
      aria-label={`Skill: ${name}, Level: ${level}`}
      role="button"
      tabIndex={0}
      onClick={isUnlocked ? onClick : undefined} // Only clickable if unlocked
      onKeyPress={(e) => {
        if (isUnlocked && (e.key === "Enter" || e.key === " ")) {
          onClick && onClick();
        }
      }}
    >
      <Hexagon
        x={x}
        y={y}
        size={size}
        fill="rgba(0,0,0,1)"
        stroke={color}
        strokeWidth={1.5}
      />
      {logo ? (
        <image
          href={logo}
          x={x - size / 2}
          y={y - size / 2}
          width={size}
          height={size}
          clipPath={`url(#hexClip-${name})`}
        />
      ) : (
        <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="18">
          {name}
        </text>
      )}
      {/* Define the clip path only if logo is present */}
      {logo && (
        <defs>
          <clipPath id={`hexClip-${name}`}>
            <polygon
              points={`
                ${x},${y - size}
                ${x + (size * Math.sqrt(3)) / 2},${y - size / 2}
                ${x + (size * Math.sqrt(3)) / 2},${y + size / 2}
                ${x},${y + size}
                ${x - (size * Math.sqrt(3)) / 2},${y + size / 2}
                ${x - (size * Math.sqrt(3)) / 2},${y - size / 2}
              `}
            />
          </clipPath>
        </defs>
      )}
    </motion.g>
  );
};

export default SkillNode;
