import React, { useEffect, useState, type JSX } from "react";
import { motion } from "framer-motion";
import Hexagon from "./Hexagon";
import profilePic from "../../assets/images/profile-pic.png";
import type { SkillCategory } from "~/types/skills";

export default function SkillTree({
  skillCategories,
  unlockedSkillsIndex,
}: {
  skillCategories: SkillCategory[];
  unlockedSkillsIndex: number;
}) {
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>([]);

  useEffect(() => {
    // Unlock all skills up to the current year
    const newSkills = skillCategories
      .slice(0, unlockedSkillsIndex + 1)
      .flatMap((category) => category.skills.map((skill) => skill.name));

    setUnlockedSkills(newSkills);
  }, [unlockedSkillsIndex, skillCategories]);

  const svgSize = Math.min(window.innerWidth * 0.8, 800); // Dynamic size, max 800px
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  const mainHexSize = svgSize * 0.1;
  const categoryHexSize = svgSize * 0.08;
  const skillHexSize = svgSize * 0.07;
  const categoryRadius = svgSize * 0.2;
  const skillRadius = svgSize * 0.35;

  const getPosition = (
    index: number,
    total: number,
    radius: number,
    offset: number = 0
  ) => {
    const angle = ((index - 1) * (2 * Math.PI)) / total - Math.PI / 2;
    return {
      x: centerX + (radius + offset) * Math.cos(angle),
      y: centerY + (radius + offset) * Math.sin(angle),
    };
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full">
        {/* 1) Define the glow filter */}
        <defs>
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#00fffa"
              floodOpacity="1"
            />
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="8"
              floodColor="#00fffa"
              floodOpacity="0.7"
            />
          </filter>
        </defs>

        <g>
          {/* Draw the category + skill lines, then hexagons, for each category */}
          {skillCategories.map((category, categoryIndex) => {
            const categoryPos = getPosition(
              categoryIndex + 1,
              skillCategories.length,
              categoryRadius
            );
            const lines: JSX.Element[] = [];
            const hexes: JSX.Element[] = [];

            // 1) Push line from center to category
            lines.push(
              <motion.line
                key={`${category.name}-center-line`}
                x1={centerX}
                y1={centerY}
                x2={categoryPos.x}
                y2={categoryPos.y}
                stroke={category.color}
                strokeWidth="2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            );

            // 2) Category Hexagon
            hexes.push(
              <motion.g
                key={`${category.name}-hex`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: categoryIndex * 0.2,
                }}
              >
                <Hexagon
                  x={categoryPos.x}
                  y={categoryPos.y}
                  size={categoryHexSize}
                  fill="rgba(0,0,0,1)"
                  stroke={category.color}
                  strokeWidth={2}
                />
                <text
                  x={categoryPos.x}
                  y={categoryPos.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                >
                  {category.name}
                </text>
              </motion.g>
            );

            // 3) Skill Nodes
            category.skills.forEach((skill, skillIndex) => {
              const skillAngleOffset =
                (skillIndex - (category.skills.length - 1) / 2) * 0.3;
              const skillPos = getPosition(
                categoryIndex + 1 + skillAngleOffset,
                skillCategories.length,
                skillRadius
              );
              const isUnlocked = unlockedSkills.includes(skill.name);

              // Line connecting category to skill
              lines.push(
                <motion.line
                  key={`${skill.name}-line`}
                  x1={categoryPos.x}
                  y1={categoryPos.y}
                  x2={skillPos.x}
                  y2={skillPos.y}
                  stroke={category.color}
                  strokeWidth="1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: isUnlocked ? 1 : 0.2,
                    scale: isUnlocked ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              );

              // Skill hexagon (unlocks with animation)
              hexes.push(
                <motion.g
                  key={`${skill.name}-hex`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: isUnlocked ? 1 : 0.2,
                    scale: isUnlocked ? 1 : 0.7,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: skillIndex * 0.1,
                  }}
                >
                  <Hexagon
                    x={skillPos.x}
                    y={skillPos.y}
                    size={skillHexSize}
                    fill="rgba(0,0,0,1)"
                    stroke={category.color}
                    strokeWidth={1.5}
                  />
                  <text
                    x={skillPos.x}
                    y={skillPos.y + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="12"
                  >
                    {skill.name}
                  </text>
                </motion.g>
              );
            });

            return (
              <g key={category.name}>
                {lines}
                {hexes}
              </g>
            );
          })}

          {/* Finally, draw the center profile hex LAST so it appears on top of everything else */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Hexagon
              x={centerX}
              y={centerY}
              size={mainHexSize}
              fill="rgba(0,0,0,0.5)"
              stroke="white"
              strokeWidth={2}
            />
            <foreignObject
              x={centerX - mainHexSize / 2}
              y={centerY - mainHexSize / 2}
              width={mainHexSize * 1.7}
              height={mainHexSize * 1.7}
              transform={`translate(-${mainHexSize * 0.4}, -${
                mainHexSize * 0.5
              })`}
            >
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={profilePic.src}
                  alt="Profile"
                  className="w-24 h-full object-cover"
                />
              </div>
            </foreignObject>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
