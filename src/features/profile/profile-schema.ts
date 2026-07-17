import { z } from "zod";

import {
  careerGoals,
  experienceLevels,
  learningStyles,
  proficiencyLevels,
  skillStatuses,
} from "./profile-data";

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.enum(values), z.literal("")]);

export const profileFormSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name.").max(80),
    profilePhoto: z
      .string()
      .trim()
      .max(500)
      .refine(
        (value) => !value || /^https?:\/\/.+/i.test(value),
        "Use a valid http or https image URL.",
      ),
    currentEducation: z.string().trim().max(120, "Keep this under 120 characters."),
    currentRole: z.string().trim().max(80, "Keep this under 80 characters."),
    bio: z.string().trim().max(500, "Keep your bio under 500 characters."),
    experienceLevel: optionalEnum(experienceLevels),
    careerGoal: optionalEnum(careerGoals),
    weeklyStudyHours: z.number().int().min(1).max(80),
    learningStyle: optionalEnum(learningStyles),
    preferredProgrammingLanguage: z.string().trim().max(50),
    skills: z
      .array(
        z.object({
          id: z.uuid(),
          name: z.string().trim().min(1, "Enter a skill name.").max(50),
          proficiency: z.enum(proficiencyLevels),
          status: z.enum(skillStatuses),
        }),
      )
      .max(25, "You can add up to 25 skills."),
  })
  .superRefine((profile, context) => {
    const seen = new Set<string>();
    profile.skills.forEach((skill, index) => {
      const name = skill.name.toLocaleLowerCase();
      if (seen.has(name)) {
        context.addIssue({
          code: "custom",
          message: "This skill is already in your profile.",
          path: ["skills", index, "name"],
        });
      }
      seen.add(name);
    });
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
