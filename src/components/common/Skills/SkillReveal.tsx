import { StickyScroll } from "../../ui/sticky-scroll-reveal";
import SkillTree from "./SkillTree";
import { allSkillCategories } from "./skillCategories";

const years = [
  {
    title: "Bachelor's Beginnings",
    description:
      "Started on a Bachelor's degree in Computer Science, laying the foundational knowledge with limited prior coding experience.",
    year: 2015,
  },
  {
    title: "Mastering Web Technologies",
    description:
      "Pursued a Master's degree in Web Technologies, Applications, and Science. Developed a keen interest in web development, especially enjoying working with React, Next.js, Astro, and Node.js.",
    year: 2019,
  },
  {
    title: "Software Engineer at Vertex Systems",
    description:
      "Joined Vertex Systems as a full-time Software Engineer, focusing primarily on Angular frontend development. Completed a master thesis on service meshes and API gateways in Kubernetes, and became proficient with cloud-native technologies such as Kubernetes and Docker.",
    year: 2021,
  },
  {
    title: "Full Stack Developer & Scrum Master",
    description:
      "Transitioned to a Full Stack Developer role, gaining proficiency in Java, .NET, and Python. Took on Scrum Master responsibilities to enhance team collaboration and project management.",
    year: 2023,
  },
];

const SkillReveal = () => {
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
      <StickyScroll content={content} />
    </div>
  );
};

export default SkillReveal;
