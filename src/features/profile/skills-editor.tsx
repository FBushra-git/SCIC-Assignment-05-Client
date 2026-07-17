"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Braces, Plus, Trash2 } from "lucide-react";
import type {
  Control,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { proficiencyLevels, skillStatuses } from "./profile-data";
import type { ProfileFormValues } from "./profile-schema";
import { fieldClassName } from "./profile-ui";

type SkillFields = FieldArrayWithId<ProfileFormValues, "skills", "fieldKey">[];

type SkillsEditorProps = {
  append: UseFieldArrayAppend<ProfileFormValues, "skills">;
  control: Control<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  fields: SkillFields;
  register: UseFormRegister<ProfileFormValues>;
  remove: UseFieldArrayRemove;
};

function SkillRow({
  control,
  error,
  field,
  index,
  register,
  remove,
}: {
  control: Control<ProfileFormValues>;
  error?: { name?: { message?: string } };
  field: SkillFields[number];
  index: number;
  register: UseFormRegister<ProfileFormValues>;
  remove: UseFieldArrayRemove;
}) {
  const proficiency = useWatch({ control, name: `skills.${index}.proficiency` });
  const status = useWatch({ control, name: `skills.${index}.status` });
  const activeBars = proficiencyLevels.indexOf(proficiency) + 1;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border/80 bg-background/70 p-4 shadow-sm dark:bg-slate-950/35"
      exit={{ opacity: 0, scale: 0.98 }}
      initial={{ opacity: 0, y: 8 }}
      layout
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(150px,0.8fr)_minmax(150px,0.8fr)_auto] lg:items-start">
        <div>
          <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground" htmlFor={`skill-name-${index}`}>
            Skill name
          </label>
          <div className="relative">
            <Braces aria-hidden="true" className="absolute left-3.5 top-1/2 z-10 size-4 -translate-y-1/2 text-blue-600 dark:text-cyan-300" />
            <input
              className={cn(fieldClassName, "pl-10", error?.name && "border-destructive")}
              id={`skill-name-${index}`}
              placeholder="e.g. React"
              {...register(`skills.${index}.name`)}
            />
          </div>
          {error?.name?.message ? (
            <p className="mt-2 text-xs font-semibold text-destructive">{error.name.message}</p>
          ) : null}
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground" htmlFor={`skill-level-${index}`}>
            Proficiency
          </label>
          <select
            className={fieldClassName}
            id={`skill-level-${index}`}
            {...register(`skills.${index}.proficiency`)}
          >
            {proficiencyLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
          <div aria-hidden="true" className="mt-2 flex gap-1">
            {proficiencyLevels.map((level, barIndex) => (
              <span
                className={cn(
                  "h-1.5 flex-1 rounded-full bg-border transition-colors",
                  barIndex < activeBars && "bg-gradient-to-r from-blue-600 to-cyan-400",
                )}
                key={level}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground" htmlFor={`skill-status-${index}`}>
            Status
          </label>
          <select
            className={fieldClassName}
            id={`skill-status-${index}`}
            {...register(`skills.${index}.status`)}
          >
            {skillStatuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <span
            className={cn(
              "mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold",
              status === "Completed" && "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
              status === "Practicing" && "bg-cyan-500/12 text-cyan-700 dark:text-cyan-300",
              status === "Learning" && "bg-blue-500/12 text-blue-700 dark:text-blue-300",
            )}
          >
            {status}
          </span>
        </div>

        <Button
          aria-label={`Remove ${field.name || "skill"}`}
          className="mt-6 size-12 rounded-xl text-muted-foreground hover:text-destructive"
          onClick={() => remove(index)}
          size="icon-lg"
          type="button"
          variant="ghost"
        >
          <Trash2 aria-hidden="true" className="size-5" />
        </Button>
      </div>
    </motion.div>
  );
}

export function SkillsEditor({
  append,
  control,
  errors,
  fields,
  register,
  remove,
}: SkillsEditorProps) {
  function addSkill() {
    append({
      id: crypto.randomUUID(),
      name: "",
      proficiency: "Beginner",
      status: "Learning",
    });
  }

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold">Technical skill inventory</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add up to 25 skills and keep each learning state current.
          </p>
        </div>
        <Button
          className="h-11 rounded-xl bg-blue-600 px-4 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500"
          disabled={fields.length >= 25}
          onClick={addSkill}
          type="button"
        >
          <Plus aria-hidden="true" />
          Add skill
        </Button>
      </div>

      {fields.length === 0 ? (
        <button
          className="group grid w-full place-items-center rounded-2xl border border-dashed border-blue-300/70 bg-blue-50/50 px-6 py-12 text-center outline-none transition hover:border-blue-500 hover:bg-blue-50 focus-visible:ring-4 focus-visible:ring-blue-500/15 dark:border-cyan-700/60 dark:bg-cyan-950/15 dark:hover:border-cyan-400"
          onClick={addSkill}
          type="button"
        >
          <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/20 transition group-hover:scale-105">
            <Braces aria-hidden="true" className="size-6" />
          </span>
          <span className="mt-4 font-bold">Build your skill map</span>
          <span className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
            Your skills help the AI avoid topics you already know and focus on the gaps that matter.
          </span>
        </button>
      ) : (
        <div className="grid gap-3">
          <AnimatePresence initial={false}>
            {fields.map((field, index) => (
              <SkillRow
                control={control}
                error={errors.skills?.[index]}
                field={field}
                index={index}
                key={field.fieldKey}
                register={register}
                remove={remove}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {errors.skills?.message ? (
        <p className="mt-3 text-sm font-semibold text-destructive">{errors.skills.message}</p>
      ) : null}
    </div>
  );
}
