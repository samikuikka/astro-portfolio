import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Hexagon from "./Hexagon";
import profilePic from "../../../assets/images/profile-pic.png";
import CategoryNode from "./CategoryNode";
import SkillNode from "./SkillNode";
import SkillDialog from "./SkillDialog";
import type { Skill, SkillCategory } from "~/types/skills";

interface SkillTreeProps {
  skillCategories: SkillCategory[];
  currentYear: number;
}

const SkillTree: React.FC<SkillTreeProps> = ({
  skillCategories,
  currentYear,
}) => {
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Function to open dialog
  const openDialog = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsDialogOpen(true);
  };

  // Function to close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedSkill(null);
  };

  // Calculate SVG size
  const svgSize = useMemo(() => Math.min(window.innerWidth * 0.8, 800), []);
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;
  const mainHexSize = svgSize * 0.1;
  const categoryHexSize = svgSize * 0.06;
  const skillHexSize = svgSize * 0.05;
  const categoryRadius = svgSize * 0.2;
  const skillRadius = svgSize * 0.35;

  // Function to calculate position
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
        {/* Define the glow filter */}
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
          {/* Category and Skill Lines */}
          {skillCategories.map((category, categoryIndex) => {
            const categoryYear = Math.min(
              ...category.skills.map((skill) => skill.year)
            );
            const isCategoryUnlocked = categoryYear <= currentYear;

            const categoryPos = getPosition(
              categoryIndex + 1,
              skillCategories.length,
              categoryRadius
            );

            return (
              <g key={`lines-${category.name}`}>
                {/* Line from center to category */}
                <motion.line
                  x1={centerX}
                  y1={centerY}
                  x2={categoryPos.x}
                  y2={categoryPos.y}
                  stroke={category.color}
                  strokeWidth="2"
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: isCategoryUnlocked ? 1 : 0.2 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />

                {/* Lines from category to skills */}
                {category.skills.map((skill, skillIndex) => {
                  const isUnlocked = skill.year <= currentYear;
                  const skillAngleOffset =
                    (skillIndex - (category.skills.length - 1) / 2) * 0.2;
                  const skillPos = getPosition(
                    categoryIndex + 1 + skillAngleOffset,
                    skillCategories.length,
                    skillRadius
                  );

                  return (
                    <motion.line
                      key={`line-${category.name}-${skill.name}`}
                      x1={categoryPos.x}
                      y1={categoryPos.y}
                      x2={skillPos.x}
                      y2={skillPos.y}
                      stroke={category.color}
                      strokeWidth="1"
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: isUnlocked ? 1 : 0.2 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Category and Skill Nodes */}
          {skillCategories.map((category, categoryIndex) => {
            const categoryYear = Math.min(
              ...category.skills.map((skill) => skill.year)
            );
            const isCategoryUnlocked = categoryYear <= currentYear;

            const categoryPos = getPosition(
              categoryIndex + 1,
              skillCategories.length,
              categoryRadius
            );

            return (
              <g key={`nodes-${category.name}`}>
                {/* Category Node */}
                <CategoryNode
                  x={categoryPos.x}
                  y={categoryPos.y}
                  size={categoryHexSize}
                  color={category.color}
                  name={category.name}
                  isUnlocked={isCategoryUnlocked}
                  delay={categoryIndex * 0.2}
                />

                {/* Skill Nodes */}
                {category.skills.map((skill, skillIndex) => {
                  const isUnlocked = skill.year <= currentYear;
                  const skillAngleOffset =
                    (skillIndex - (category.skills.length - 1) / 2) * 0.2;
                  const skillPos = getPosition(
                    categoryIndex + 1 + skillAngleOffset,
                    skillCategories.length,
                    skillRadius
                  );

                  return (
                    <SkillNode
                      key={`skill-${category.name}-${skill.name}`}
                      x={skillPos.x}
                      y={skillPos.y}
                      size={skillHexSize}
                      color={category.color}
                      name={skill.name}
                      isUnlocked={isUnlocked}
                      delay={skillIndex * 0.1}
                      level={skill.level}
                      logo={skill.logo}
                      onClick={() => openDialog(skill)} // Pass onClick handler
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Center Profile Hexagon */}
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
              transform={`translate(-${mainHexSize * 0.4}, -${mainHexSize * 0.5})`}
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

      <SkillDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        skill={selectedSkill}
      />
    </div>
  );
};

export default SkillTree;
