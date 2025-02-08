import reactLogo from "../../../assets/logos/react.svg";
import nextjsLogo from "../../../assets/logos/nextdotjs.svg";
import angularLogo from "../../../assets/logos/angular.svg";
import dotnetLogo from "../../../assets/logos/dotnet.svg";
import nodejsLogo from "../../../assets/logos/nodedotjs.svg";
import dockerLogo from "../../../assets/logos/docker.svg";
import astroLogo from "../../../assets/logos/astro.svg";
import pythonLogo from "../../../assets/logos/python.svg";
import kubernetesLogo from "../../../assets/logos/kubernetes.svg";
import mongodbLogo from "../../../assets/logos/mongodb.svg";
import mysqlLogo from "../../../assets/logos/mysql.svg";
import postgresqlLogo from "../../../assets/logos/postgresql.svg";
import redisLogo from "../../../assets/logos/redis.svg";
import type { SkillCategory } from "~/types/skills";

export const getSkillCategories = (
  t: (key: string) => string
): SkillCategory[] => [
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
        year: 2023,
        logo: pythonLogo.src,
        description: t("skills.backend.python.description"),
      },
      {
        name: t("skills.backend.java.name"),
        level: 4,
        year: 2023,
        description: t("skills.backend.java.description"),
      },
      {
        name: t("skills.backend.dotnet.name"),
        level: 4,
        year: 2023,
        logo: dotnetLogo.src,
        description: t("skills.backend.dotnet.description"),
      },
    ],
  },
  {
    name: t("skills.devops"),
    color: "#feca57",
    skills: [
      {
        name: t("skills.devops.docker.name"),
        level: 3,
        year: 2021,
        logo: dockerLogo.src,
        description: t("skills.devops.docker.description"),
        projects: [
          {
            name: "Chat application",
            description:
              "A web based chat application with Kubernetes load-balancing.",
            url: "https://github.com/samikuikka/Chat-application",
          },
          {
            name: "Code grader",
            description: "A web based code grader for programming courses.",
            url: "https://github.com/samikuikka/code-grader",
          },
        ],
      },
      {
        name: t("skills.devops.kubernetes.name"),
        level: 3,
        year: 2021,
        logo: kubernetesLogo.src,
        description: t("skills.devops.kubernetes.description"),
        projects: [
          {
            name: "Chat application",
            description:
              "A web based chat application with Kubernetes load-balancing.",
            url: "https://github.com/samikuikka/Chat-application",
          },
        ],
      },
      {
        name: t("skills.devops.cicd.name"),
        level: 3,
        year: 2023,
        description: t("skills.devops.cicd.description"),
      },
    ],
  },
  {
    name: t("skills.database"),
    color: "#ff9f43",
    skills: [
      {
        name: t("skills.database.mongodb.name"),
        level: 4,
        year: 2021,
        logo: mongodbLogo.src,
        description: t("skills.database.mongodb.description"),
        projects: [
          {
            name: "Workout logger",
            description:
              "Backend implementation for workout logging endpoints.",
            url: "https://github.com/samikuikka/workout-logger-backend",
          },
        ],
      },
      {
        name: t("skills.database.postgresql.name"),
        level: 4,
        year: 2021,
        logo: postgresqlLogo.src,
        description: t("skills.database.postgresql.description"),
        projects: [
          {
            name: "Chat application",
            description:
              "A web based chat application with Kubernetes load-balancing.",
            url: "https://github.com/samikuikka/Chat-application",
          },
          {
            name: "Code grader",
            description: "A web based code grader for programming courses.",
            url: "https://github.com/samikuikka/code-grader",
          },
        ],
      },
      {
        name: t("skills.database.mysql.name"),
        level: 4,
        year: 2019,
        logo: mysqlLogo.src,
        description: t("skills.database.mysql.description"),
      },
      {
        name: t("skills.database.redis.name"),
        level: 4,
        year: 2023,
        logo: redisLogo.src,
        description: t("skills.database.redis.description"),
        projects: [
          {
            name: "Code grader",
            description: "A web based code grader for programming courses.",
            url: "https://github.com/samikuikka/code-grader",
          },
        ],
      },
    ],
  },
];
