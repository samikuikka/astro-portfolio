import newPortfolio from "../../assets/images/new-portfolio.png";
import oldPortfolio from "../../assets/images/old-portfolio.png";
import aiCreator from "../../assets/images/ai-creator.png";
import eCommerce from "../../assets/images/e-commerce.png";
import workoutLogger from "../../assets/images/workout-logger.png";
import realEstate from "../../assets/images/real-estate.png";
import mapShowcase from "../../assets/images/map-showcase.png";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveDemoUrl?: string;
  codeUrl?: string;
}

export const getProjects = (t: (key: string) => string): Project[] => [
  {
    id: 7,
    title: t("projects.mapShowcase.title"),
    description: t("projects.mapShowcase.description"),
    imageUrl: mapShowcase.src,
    technologies: ["React", "Node.js", "TailwindCSS", "Leaflet", "Stripe"],
    liveDemoUrl: "https://planchinatrips.com",
  },
  {
    id: 6,
    title: t("projects.realEstate.title"),
    description: t("projects.realEstate.description"),
    imageUrl: realEstate.src,
    technologies: ["Python", "Next.js", "Scikit learn"],
    liveDemoUrl: "https://helsinki-real-estate-predictor.vercel.app/",
  },
  {
    id: 1,
    title: t("projects.portfolio.title"),
    description: t("projects.portfolio.description"),
    imageUrl: newPortfolio.src,
    technologies: ["Astro", "React", "TailwindCSS", "TypeScript"],
    codeUrl: "https://github.com/samikuikka/astro-portfolio",
    liveDemoUrl: "https://samikuikka.com",
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
    codeUrl: "https://github.com/bytecraftoy/aalto-2022",
  },
  {
    id: 3,
    title: t("projects.oldPortfolio.title"),
    description: t("projects.oldPortfolio.description"),
    imageUrl: oldPortfolio.src,
    technologies: ["Astro", "React", "TailwindCSS", "Vercel"],
  },
];
