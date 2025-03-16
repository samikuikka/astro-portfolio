import newPortfolio from "../../assets/images/new-portfolio.png";
import oldPortfolio from "../../assets/images/old-portfolio.png";
import aiCreator from "../../assets/images/ai-creator.png";
import eCommerce from "../../assets/images/e-commerce.png";
import workoutLogger from "../../assets/images/workout-logger.png";
import realEstate from "../../assets/images/real-estate.png";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}

export const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: 6,
    title: t("projects.realEstate.title"),
    description: t("projects.realEstate.description"),
    imageUrl: realEstate.src,
    technologies: ["Python", "Next.js", "Scikit learn"],
  },
  {
    id: 1,
    title: t("projects.portfolio.title"),
    description: t("projects.portfolio.description"),
    imageUrl: newPortfolio.src,
    technologies: ["Astro", "React", "TailwindCSS", "TypeScript"],
  },
  {
    id: 2,
    title: t("projects.aiGameContentCreator.title"),
    description: t("projects.aiGameContentCreator.description"),
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
    title: t("projects.oldPortfolio.title"),
    description: t("projects.oldPortfolio.description"),
    imageUrl: oldPortfolio.src,
    technologies: ["Astro", "React", "TailwindCSS", "Vercel"],
  },
  {
    id: 4,
    title: t("projects.eCommercePlatform.title"),
    description: t("projects.eCommercePlatform.description"),
    imageUrl: eCommerce.src,
    technologies: ["Dart", "Flutter", "Riverpod"],
  },
  {
    id: 5,
    title: t("projects.workoutLogger.title"),
    description: t("projects.workoutLogger.description"),
    imageUrl: workoutLogger.src,
    technologies: ["React", "Node.js", "Express", "MongoDB", "Typescript"],
  },
];
