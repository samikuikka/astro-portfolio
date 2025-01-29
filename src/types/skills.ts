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
}
