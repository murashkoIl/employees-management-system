import { DeleteResult } from "@graphql/shared/interfaces";
import { Skill } from "@src/interfaces/skill.interface";

export interface GetSkillsData {
  skills: Skill[];
}

export interface UpdateSkillInput {
  id: string;
  skill: Pick<Skill, "name">;
}

export interface DeleteSkillOutput {
  deleteSkill: DeleteResult;
}

export interface UpdateSkillResult {
  updateSkill: Skill;
}

export interface CreateSkillInput {
  skill: Pick<Skill, "name">;
}

export interface CreateSkillOutput {
  createSkill: {
    skills: Skill;
    affected: number;
  };
}
