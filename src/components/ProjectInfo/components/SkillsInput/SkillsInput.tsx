import { useQuery } from "@apollo/client";
import { Stack, Typography } from "@mui/material";
import { DynamicFieldset } from "@src/components/DynamicFieldset";
import { DynamicArrayField } from "@src/components/DynamicFieldset/components/DynamicArrayField";
import { GetSkillsData } from "@src/graphql/Entity/Skill/Skill.interface";
import { GET_SKILLS } from "@src/graphql/Entity/Skill/Skill.queries";
import { useCallback, useMemo } from "react";
import { useFieldArray } from "react-hook-form";
import { SkillsInputProps } from "./SkillsInput.types";

export const SkillsInput = ({ onError, control }: SkillsInputProps) => {
  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
    update: updateSkill,
  } = useFieldArray({
    control,
    name: "techStack",
  });

  const { data: skillsData } = useQuery<GetSkillsData>(GET_SKILLS, {
    onError: onError,
  });

  const handleSkillDelete = (name: string) => {
    removeSkill(skillsFields.findIndex((skill) => skill.name === name));
  };

  const availableSkills = useMemo(() => {
    if (!skillsData) return [];

    const skillsAlreadyTaken = new Set(skillsFields.map(({ name }) => name));

    return skillsData.skills.reduce((acc, cur) => {
      if (!skillsAlreadyTaken.has(cur.name)) {
        acc.push({ entryName: cur.name, id: cur.id });
      }

      return acc;
    }, [] as { entryName: string; id: string }[]);
  }, [skillsData, skillsFields]);

  const handleNewSkill = useCallback(
    (id: string) => {
      appendSkill({
        id,
        name:
          skillsData?.skills.find((skill) => skill.id === id)?.name ||
          "unknown",
      });
    },
    [appendSkill, skillsData?.skills],
  );

  return (
    <>
      <Stack gap={2} justifyContent="start">
        <Typography variant="h5" component="h2">
          Skills
        </Typography>
        <DynamicFieldset
          onNew={handleNewSkill}
          inputEntries={availableSkills}
          fieldForValue="id"
        >
          {skillsFields.map((field, index) => (
            <DynamicArrayField
              key={field.id}
              entryName={field.name}
              onDelete={handleSkillDelete}
            />
          ))}
        </DynamicFieldset>
      </Stack>
    </>
  );
};
