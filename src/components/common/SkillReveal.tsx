import { useState } from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import SkillTree from "./SkillTree";
import type { SkillCategory } from "~/types/skills";

const skillTrees = [
  [
    {
      name: "Frontend",
      color: "#ff6b6b",
      skills: [
        { name: "React", level: 5 },
        { name: "Vue", level: 4 },
        { name: "CSS", level: 4 },
      ],
    },

    {
      name: "Backend",
      color: "#4ecdc4",
      skills: [],
    },

    {
      name: "DevOps",
      color: "#feca57",
      skills: [],
    },
  ],
  [
    {
      name: "Frontend",
      color: "#ff6b6b",
      skills: [
        { name: "React", level: 5 },
        { name: "Vue", level: 4 },
        { name: "CSS", level: 4 },
      ],
    },
    {
      name: "Backend",
      color: "#4ecdc4",
      skills: [
        { name: "Node.js", level: 5 },
        { name: "Python", level: 4 },
        { name: "SQL", level: 4 },
      ],
    },
    {
      name: "DevOps",
      color: "#feca57",
      skills: [],
    },
  ],
  [
    {
      name: "Frontend",
      color: "#ff6b6b",
      skills: [
        { name: "React", level: 5 },
        { name: "Vue", level: 4 },
        { name: "CSS", level: 4 },
      ],
    },
    {
      name: "Backend",
      color: "#4ecdc4",
      skills: [
        { name: "Node.js", level: 5 },
        { name: "Python", level: 4 },
        { name: "SQL", level: 4 },
      ],
    },
    {
      name: "DevOps",
      color: "#feca57",
      skills: [
        { name: "Docker", level: 3 },
        { name: "AWS", level: 4 },
        { name: "CI/CD", level: 3 },
      ],
    },
  ],
];

const SkillReveal = () => {
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  const content = [
    {
      title: "Collaborative Editing",
      description: "Year 2019 - Core Frontend Skills.",
      content: (
        <SkillTree skillCategories={skillTrees[0]} unlockedSkillsIndex={0} />
      ),
    },
    {
      title: "Real-time Changes",
      description: "Year 2020 - Backend Added.",
      content: (
        <SkillTree skillCategories={skillTrees[1]} unlockedSkillsIndex={1} />
      ),
    },
    {
      title: "Version Control",
      description: "Year 2021 - DevOps Added.",
      content: (
        <SkillTree skillCategories={skillTrees[2]} unlockedSkillsIndex={2} />
      ),
    },
  ];

  return (
    <div className="pt-20">
      <StickyScroll content={content} onActiveChange={setActiveYearIndex} />
    </div>
  );
};

export default SkillReveal;
