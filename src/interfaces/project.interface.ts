import { Skill } from "./skill.interface";

export interface Project {
  id: string;
  name: string;
  internal_name?: string;
  description: string;
  domain: string;
  start_date: string;
  end_date?: string;
  team_size: number;
  tech_stack: Skill[];
}
