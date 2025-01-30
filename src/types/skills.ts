export interface SkillCategory {
  name: string;
  color: string;
  skills: Skill[];
}
export interface Skill {
  name: string;
  level: number;
  year: number;
  logo?: string;
  description?: string;
  projects?: Project[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
}
