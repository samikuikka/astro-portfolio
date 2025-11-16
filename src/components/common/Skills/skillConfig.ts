import reactLogo from "../../../assets/logos/react.svg";
import nextjsLogo from "../../../assets/logos/nextdotjs.svg";
import angularLogo from "../../../assets/logos/angular.svg";
import dotnetLogo from "../../../assets/logos/dotnet.svg";
import nodejsLogo from "../../../assets/logos/nodedotjs.svg";
import astroLogo from "../../../assets/logos/astro.svg";
import pythonLogo from "../../../assets/logos/python.svg";
import workflowLogo from "../../../assets/logos/workflow.svg";
import sparklesLogo from "../../../assets/logos/sparkles.svg";
import dataZapLogo from "../../../assets/logos/database-zap.svg";

import type { SkillCategory } from "~/types/skills";

export const getSkillCategories = (
  t: (key: string) => string
): SkillCategory[] => [
  {
    name: t("skills.ai"),
    color: "#feca57",
    skills: [
      {
        name: t("skills.agent-systems.title"),
        level: 5,
        year: 2023,
        logo: workflowLogo.src,
        description: t("skills.agent-systems.description"),
      },
      {
        name: t("skills.prompt-optimization.title"),
        level: 5,
        year: 2025,
        logo: sparklesLogo.src,
        description: t("skills.prompt-optimization.description"),
      },
      {
        name: t("skills.rag.title"),
        level: 5,
        year: 2023,
        logo: dataZapLogo.src,
        description: t("skills.rag.description"),
      },
    ],
  },
  {
    name: t("skills.frontend"),
    color: "#ff6b6b",
    skills: [
      {
        name: t("skills.frontend.react.name"),
        level: 5,
        year: 2019,
        logo: reactLogo.src,
        description: t("skills.frontend.react.description"),
        projects: [
          {
            name: "Portfolio Website",
            description:
              "A web based automation tool for rapid game content creation using AI models.",
            url: "https://github.com/bytecraftoy/aalto-2022",
          },
          {
            name: "Workout logger",
            description: "Full stack application for logging workouts.",
            url: "https://github.com/samikuikka/Chat-application",
          },
        ],
      },
      {
        name: t("skills.frontend.nextjs.name"),
        level: 4,
        year: 2019,
        logo: nextjsLogo.src,
        description: t("skills.frontend.nextjs.description"),
        projects: [
          {
            name: "Language learning blog",
            description:
              "A blog site for creating blog posts in target language and getting feedback from native speakers.",
            url: "https://github.com/samikuikka/www-project",
          },
        ],
      },
      {
        name: t("skills.frontend.astro.name"),
        level: 4,
        year: 2019,
        logo: astroLogo.src,
        description: t("skills.frontend.astro.description"),
        projects: [
          {
            name: "Portfolio Website",
            description: "This website is built with Astro.",
            url: "https://github.com/samikuikka/astro-portfolio",
          },
          {
            name: "Old Portfolio Website",
            description: "My old portfolio website was also built with Astro.",
            url: "https://github.com/samikuikka/Portfolio",
          },
        ],
      },
      {
        name: t("skills.frontend.angular.name"),
        level: 4,
        year: 2021,
        logo: angularLogo.src,
        description: t("skills.frontend.angular.description"),
      },
    ],
  },
  {
    name: t("skills.backend"),
    color: "#4ecdc4",
    skills: [
      {
        name: t("skills.backend.nodejs.name"),
        level: 5,
        year: 2019,
        logo: nodejsLogo.src,
        description: t("skills.backend.nodejs.description"),
      },
      {
        name: t("skills.backend.python.name"),
        level: 4,
        year: 2021,
        logo: pythonLogo.src,
        description: t("skills.backend.python.description"),
      },
      {
        name: t("skills.backend.java.name"),
        level: 4,
        year: 2021,
        description: t("skills.backend.java.description"),
      },
      {
        name: t("skills.backend.dotnet.name"),
        level: 4,
        year: 2021,
        logo: dotnetLogo.src,
        description: t("skills.backend.dotnet.description"),
      },
    ],
  },
];
