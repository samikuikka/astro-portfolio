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
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution with real-time inventory management.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
  },
  {
    id: 2,
    title: "Weather App",
    description:
      "A sleek weather application with location-based forecasts and interactive maps.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    technologies: ["React Native", "OpenWeatherMap API", "Google Maps API"],
  },
  {
    id: 3,
    title: "Task Management System",
    description:
      "A collaborative task management tool with real-time updates and analytics.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Chart.js"],
  },
  {
    id: 4,
    title: "Social Media Dashboard",
    description:
      "An all-in-one dashboard for managing multiple social media accounts.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Redux", "Node.js", "Various Social Media APIs"],
  },
];
