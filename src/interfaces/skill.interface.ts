import { Mastery } from "@constants/skill-mastery.constants";

export interface Skill {
  id: string;
  name: string;
}

export interface SkillMastery {
  skill_name: string;
  mastery: Mastery;
}
