import { useQuery } from "@apollo/client";
import { Stack, Typography } from "@mui/material";
import { DynamicFieldset } from "@src/components/DynamicFieldset";
import { DynamicArrayFieldWithSelect } from "@src/components/DynamicFieldset/components/DynamicArrayFieldWithSelect";
import { Mastery } from "@src/constants/skill-mastery.constants";
import { GetSkillsData } from "@src/graphql/Entity/Skill/Skill.interface";
import { GET_SKILLS } from "@src/graphql/Entity/Skill/Skill.queries";
import { useCallback, useMemo } from "react";
import { useFieldArray } from "react-hook-form";
import { SkillsInputProps } from "./SkillsInput.types";
import { useTranslation } from "react-i18next";

export const SkillsInput = ({ onError, control }: SkillsInputProps) => {
  const { t } = useTranslation();
  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
    update: updateSkill,
  } = useFieldArray({
    control,
    name: "user.profile.skills",
  });

  const { data: skillsData } = useQuery<GetSkillsData>(GET_SKILLS, {
    onError: onError,
  });

  const handleSkillDelete = (name: string) => {
    removeSkill(skillsFields.findIndex((skill) => skill.skill_name === name));
  };

  const handleSkillChange = (name: string, newValue: string) => {
    if (isMastery(newValue)) {
      updateSkill(
        skillsFields.findIndex((skill) => skill.skill_name === name),
        { skill_name: name, mastery: newValue },
      );
    }

    function isMastery(value: string): value is Mastery {
      if (Object.values(Mastery).includes(value as Mastery)) {
        return true;
      }

      return false;
    }
  };

  const availableSkills = useMemo(() => {
    if (!skillsData) return [];

    const skillsAlreadyTaken = new Set(
      skillsFields.map(({ skill_name }) => skill_name),
    );

    return skillsData.skills.reduce((acc, cur) => {
      if (!skillsAlreadyTaken.has(cur.name)) {
        acc.push({ entryName: cur.name, id: cur.id });
      }

      return acc;
    }, [] as { entryName: string; id: string }[]);
  }, [skillsData, skillsFields]);

  const handleNewSkill = useCallback(
    (entryName: string) => {
      appendSkill({ skill_name: entryName, mastery: Mastery.Novice });
    },
    [appendSkill],
  );

  return (
    <>
      <Stack gap={2} justifyContent="start">
        <Typography variant="h5" component="h2">
          {t("employeesPage.skills")}
        </Typography>
        <DynamicFieldset
          onNew={handleNewSkill}
          inputEntries={availableSkills}
          fieldForValue="entryName"
        >
          {skillsFields.map((field, index) => (
            <DynamicArrayFieldWithSelect
              key={field.id}
              entryName={field.skill_name}
              possibleValues={Mastery}
              onChange={handleSkillChange}
              value={field.mastery}
              onDelete={handleSkillDelete}
            />
          ))}
        </DynamicFieldset>
      </Stack>
    </>
  );
};
