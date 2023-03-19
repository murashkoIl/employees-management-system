import { CacheUpdaterFunction } from "src/types";
import { DeleteEntityEntryInput } from "../Entity.interface";
import {
  CreateSkillInput,
  CreateSkillOutput,
  DeleteSkillOutput,
  GetSkillsData,
  UpdateSkillInput,
  UpdateSkillResult,
} from "./Skill.interface";
import { GET_SKILLS } from "./Skill.queries";

export const deleteSkillCacheUpdate =
  (
    id: string,
  ): CacheUpdaterFunction<DeleteSkillOutput, DeleteEntityEntryInput> =>
  (cache, { data }) => {
    const existingSkills = cache.readQuery<GetSkillsData>({
      query: GET_SKILLS,
    });

    if (existingSkills && data?.deleteSkill.affected) {
      cache.writeQuery({
        query: GET_SKILLS,
        data: {
          skills: existingSkills.skills.filter((entry) => entry.id !== id),
        },
      });
    }
  };

export const createSkillCacheUpdate =
  (): CacheUpdaterFunction<CreateSkillOutput, CreateSkillInput> =>
  (cache, { data }) => {
    const existingSkills = cache.readQuery<GetSkillsData>({
      query: GET_SKILLS,
    });

    if (existingSkills) {
      cache.writeQuery({
        query: GET_SKILLS,
        data: {
          skills: [data?.createSkill, ...existingSkills.skills],
        },
      });
    }
  };

export const skillCacheUpdate =
  (id: string): CacheUpdaterFunction<UpdateSkillResult, UpdateSkillInput> =>
  (cache, { data }) => {
    const existingSkills = cache.readQuery<GetSkillsData>({
      query: GET_SKILLS,
    });

    if (existingSkills) {
      cache.writeQuery({
        query: GET_SKILLS,
        data: {
          skills: [
            ...existingSkills.skills.filter((skill) => skill.id !== id),
            data?.updateSkill,
          ],
        },
      });
    }
  };
