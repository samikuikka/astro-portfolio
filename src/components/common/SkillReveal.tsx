// src/components/SkillReveal.jsx
import { useState } from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import SkillTree from "./SkillTree";

export const allSkillCategories = [
  {
    name: "Frontend",
    color: "#ff6b6b",
    skills: [
      { name: "React", level: 5, year: 2019 },
      { name: "Vue", level: 4, year: 2019 },
      { name: "CSS", level: 4, year: 2019 },
    ],
  },
  {
    name: "Backend",
    color: "#4ecdc4",
    skills: [
      { name: "Node.js", level: 5, year: 2020 },
      { name: "Python", level: 4, year: 2020 },
      { name: "SQL", level: 4, year: 2020 },
    ],
  },
  {
    name: "DevOps",
    color: "#feca57",
    skills: [
      { name: "Docker", level: 3, year: 2021 },
      { name: "AWS", level: 4, year: 2021 },
      { name: "CI/CD", level: 3, year: 2021 },
    ],
  },
];

const years = [
  {
    title: "Introduction",
    description: "Initial State - No Skills Unlocked.",
    year: 0,
  },
  {
    title: "Collaborative Editing",
    description: "Year 2019 - Core Frontend Skills.",
    year: 2019,
  },
  {
    title: "Real-time Changes",
    description: "Year 2020 - Backend Added.",
    year: 2020,
  },
  {
    title: "Version Control",
    description: "Year 2021 - DevOps Added.",
    year: 2021,
  },
];

const SkillReveal = () => {
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  const content = years.map((yearContent, index) => ({
    title: yearContent.title,
    description: yearContent.description,
    content: (
      <SkillTree
        skillCategories={allSkillCategories}
        currentYear={yearContent.year}
      />
    ),
  }));

  return (
    <div className="pt-20">
      <StickyScroll content={content} onActiveChange={setActiveYearIndex} />
    </div>
  );
};

export default SkillReveal;
