import type { SkillCategory } from "~/types/skills";
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

export const allSkillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    color: "#ff6b6b",
    skills: [
      { name: "React", level: 5, year: 2019, logo: reactLogo.src },
      { name: "Next.js", level: 4, year: 2019, logo: nextjsLogo.src },
      { name: "Astro", level: 4, year: 2019, logo: astroLogo.src },
      { name: "Angular", level: 4, year: 2021, logo: angularLogo.src },
    ],
  },
  {
    name: "Backend",
    color: "#4ecdc4",
    skills: [
      { name: "Node.js", level: 5, year: 2019, logo: nodejsLogo.src },
      { name: "Python", level: 4, year: 2023, logo: pythonLogo.src },
      { name: "Java", level: 4, year: 2023 },
      { name: ".NET", level: 4, year: 2023, logo: dotnetLogo.src },
    ],
  },
  {
    name: "DevOps",
    color: "#feca57",
    skills: [
      { name: "Docker", level: 3, year: 2021, logo: dockerLogo.src },
      { name: "Kubernetes", level: 3, year: 2021, logo: kubernetesLogo.src },
      { name: "CI/CD", level: 3, year: 2023 },
    ],
  },
  {
    name: "Database",
    color: "#ff9f43",
    skills: [
      { name: "MongoDB", level: 4, year: 2021, logo: mongodbLogo.src },
      { name: "PostgreSQL", level: 4, year: 2021, logo: postgresqlLogo.src },
      { name: "MySQL", level: 4, year: 2019, logo: mysqlLogo.src },
      { name: "Redis", level: 4, year: 2023, logo: redisLogo.src },
    ],
  },
];
