import { StickyScroll } from "../ui/sticky-scroll-reveal";
import SkillTree from "./SkillTree";
interface SkillCategory {
  name: string;
  color: string;
  skills: Skill[];
}
interface Skill {
  name: string;
  level: number;
}

const skillTree2019: SkillCategory[] = [
  {
    name: "Frontend",
    color: "#ff6b6b",
    skills: [
      { name: "React", level: 5 },
      { name: "Vue", level: 4 },
      { name: "CSS", level: 4 },
    ],
  },
];
const skillTree2020: SkillCategory[] = [
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
];
const skillTree2021: SkillCategory[] = [
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
];
const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: <SkillTree skillCategories={skillTree2019} />,
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: <SkillTree skillCategories={skillTree2020} />,
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: <SkillTree skillCategories={skillTree2021} />,
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: <SkillTree skillCategories={skillTree2021} />,
  },
];

const SkillReveal = () => {
  return (
    <div className="pt-20">
      <StickyScroll content={content} />
    </div>
  );
};

export default SkillReveal;
