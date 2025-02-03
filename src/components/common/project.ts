import newPortfolio from "../../assets/images/new-portfolio.png";
import oldPortfolio from "../../assets/images/old-portfolio.png";
import aiCreator from "../../assets/images/ai-creator.png";
import eCommerce from "../../assets/images/e-commerce.png";
import workoutLogger from "../../assets/images/workout-logger.png";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio",
    description: "This portfolio website! Hopoe you like it! :)",
    imageUrl: newPortfolio.src,
    technologies: ["Astro", "React", "TailwindCSS", "TypeScript"],
  },
  {
    id: 2,
    title: "AI game content creator",
    description:
      "A web based automation tool for rapid game content creation using AI models. As a part of Aalto University's 2022 Web development course.",
    imageUrl: aiCreator.src,
    technologies: [
      "React",
      "Typescript",
      "TailwindCSS",
      "Node.js",
      "Express",
      "PostgreSQL",
    ],
  },
  {
    id: 3,
    title: "Old portfolio",
    description:
      "My old portfolio website, built with Astro. It was a great learning experience!",
    imageUrl: oldPortfolio.src,
    technologies: ["Astro", "React", "TailwindCSS", "Vercel"],
  },
  {
    id: 4,
    title: "E-commerce platform",
    description:
      "An mock of an e-commerce platform. This project was a part of a device-agnostic design course in Aalto University.",
    imageUrl: eCommerce.src,
    technologies: ["Dart", "Flutter", "Riverpod"],
  },
  {
    id: 5,
    title: "Workout logger",
    description:
      "Full stack application for logging workouts. This project was a part of a full stack course in Aalto University.",
    imageUrl: workoutLogger.src,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Typescript"],
  },
];
