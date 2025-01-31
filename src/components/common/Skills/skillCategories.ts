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
      {
        name: "React",
        level: 5,
        year: 2019,
        logo: reactLogo.src,
        description:
          "I have been using React since 2019 and since then I have been using it in most of my frontend projects.",
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
        name: "Next.js",
        level: 4,
        year: 2019,
        logo: nextjsLogo.src,
        description:
          "Next.js is my go-to framework for server-side rendering and creating applications with great SEO.",
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
        name: "Astro",
        level: 4,
        year: 2019,
        logo: astroLogo.src,
        description:
          "I'm huge fan of Astro's island architecture. 🏝️ In own sites I prefer to use Astro when there is a lot of static content.",
        projects: [
          {
            name: "Portfolio Website",
            description: "This website is built with Astro. ",
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
        name: "Angular",
        level: 4,
        year: 2021,
        logo: angularLogo.src,
        description:
          "Angular is a great framework for building large scale applications. It is framework used in my current job, and I'm most proficient with it. Currently using it to build a cloud based storage solution for construction industry.",
      },
    ],
  },
  {
    name: "Backend",
    color: "#4ecdc4",
    skills: [
      {
        name: "Node.js",
        level: 5,
        year: 2019,
        logo: nodejsLogo.src,
        description:
          "For JavaScript based backends, I mostly use Node.js. I'm also most proficient in it from backend tehcnologies.",
      },
      {
        name: "Python",
        level: 4,
        year: 2023,
        logo: pythonLogo.src,
        description:
          "Started using Python for serious projects in my work by creating microservice for efficient thumbnail generation using python.",
      },
      {
        name: "Java",
        level: 4,
        year: 2023,
        description:
          "Java is the language used in my current job. We create reactive microservices with Spring Boot.",
      },
      {
        name: ".NET",
        level: 4,
        year: 2023,
        logo: dotnetLogo.src,
        description:
          "I have also some knowledge on .NET, due to it being used in several microservices in the work.",
      },
    ],
  },
  {
    name: "DevOps",
    color: "#feca57",
    skills: [
      {
        name: "Docker",
        level: 3,
        year: 2021,
        logo: dockerLogo.src,
        description:
          "I have been using Docker in both own projects and in work to run backend services.",
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
        name: "Kubernetes",
        level: 3,
        year: 2021,
        logo: kubernetesLogo.src,
        description:
          "I wrote my Master's thesis on Kubernetes networking, especially about API gateways and service meshes in Kubernetes.",
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
        name: "CI/CD",
        level: 3,
        year: 2023,
        description:
          "I have used CI/CD pipelines in my work to automate testing and deployment of microservices.",
      },
    ],
  },
  {
    name: "Database",
    color: "#ff9f43",
    skills: [
      {
        name: "MongoDB",
        level: 4,
        year: 2021,
        logo: mongodbLogo.src,
        description:
          "I have used MongoDB in my work to store data for microservices.",
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
        name: "PostgreSQL",
        level: 4,
        year: 2021,
        logo: postgresqlLogo.src,
        description:
          "I have both professional experience and own interest on SQL based databases.",
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
        name: "MySQL",
        level: 4,
        year: 2019,
        logo: mysqlLogo.src,
        description:
          "I have both professional experience and own interest on SQL based databases.",
      },
      {
        name: "Redis",
        level: 4,
        year: 2023,
        logo: redisLogo.src,
        description:
          "My redis usage so far is for caching information for performance improvements in microservices.",
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
