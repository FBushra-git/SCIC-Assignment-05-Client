"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Clock3,
  Code2,
  Database,
  GraduationCap,
  ImageIcon,
  FileText,
  Languages,
  Layers3,
  LoaderCircle,
  LockKeyhole,
  Mail,
  Palette,
  RotateCcw,
  Save,
  Smartphone,
  Sparkles,
  Target,
  UserRound,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/auth-client";
import { cn } from "@/lib/utils";

import { AccountSecurity } from "./account-security";
import {
  experienceLevels,
  learningStyles,
  programmingLanguages,
  type CareerGoal,
  type UserProfile,
} from "./profile-data";
import { ProfileHero } from "./profile-hero";
import { profileFormSchema, type ProfileFormValues } from "./profile-schema";
import {
  fieldClassName,
  ProfileAvatar,
  ProfileField,
  ProfileSection,
  SaveSuccess,
} from "./profile-ui";
import { SkillsEditor } from "./skills-editor";
import { useProfile, useSaveProfile } from "./use-profile";

const careerOptions: Array<{
  value: CareerGoal;
  icon: LucideIcon;
  note: string;
}> = [
  { value: "Frontend Developer", icon: Code2, note: "Interfaces and modern web experiences" },
  { value: "Backend Developer", icon: Database, note: "APIs, systems, and scalable data" },
  { value: "Full Stack Developer", icon: Layers3, note: "Complete products from UI to database" },
  { value: "Mobile Developer", icon: Smartphone, note: "Native and cross-platform applications" },
  { value: "UI/UX Designer", icon: Palette, note: "Useful, accessible product experiences" },
  { value: "AI Engineer", icon: BrainCircuit, note: "Intelligent systems and LLM products" },
  { value: "Data Analyst", icon: BarChart3, note: "Turn data into practical decisions" },
];

const profileNavigation = [
  { href: "#identity", label: "Identity", icon: UserRound },
  { href: "#career", label: "Career preferences", icon: Target },
  { href: "#skills", label: "Skills", icon: Wrench },
  { href: "#security", label: "Account & security", icon: LockKeyhole },
];

function toFormValues(profile: UserProfile): ProfileFormValues {
  return {
    fullName: profile.fullName,
    profilePhoto: profile.profilePhoto ?? "",
    currentEducation: profile.currentEducation,
    currentRole: profile.currentRole,
    bio: profile.bio,
    experienceLevel: profile.experienceLevel,
    careerGoal: profile.careerGoal,
    weeklyStudyHours: profile.weeklyStudyHours,
    learningStyle: profile.learningStyle,
    preferredProgrammingLanguage: profile.preferredProgrammingLanguage,
    skills: profile.skills,
  };
}

function ProfileLoading() {
  return (
    <div className="section-shell animate-pulse py-8 sm:py-10">
      <div className="h-80 rounded-[2rem] bg-muted" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="h-72 rounded-[1.75rem] bg-muted" />
        <div className="grid gap-6">
          <div className="h-96 rounded-[1.75rem] bg-muted" />
          <div className="h-96 rounded-[1.75rem] bg-muted" />
        </div>
      </div>
    </div>
  );
}

function ProfileError({ message, retry }: { message: string; retry: () => void }) {
  return (
    <div className="section-shell grid min-h-[60svh] place-items-center py-16">
      <div className="glass-panel max-w-lg rounded-[2rem] p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <BrainCircuit aria-hidden="true" className="size-6" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">We could not open your profile</h1>
        <p className="mt-3 leading-7 text-muted-foreground">{message}</p>
        <Button className="mt-6 h-11 rounded-xl px-5" onClick={retry}>
          Try again
        </Button>
      </div>
    </div>
  );
}

function ProfileEditor({
  profile,
  refreshSession,
}: {
  profile: UserProfile;
  refreshSession: () => Promise<unknown>;
}) {
  const router = useRouter();
  const saveMutation = useSaveProfile();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: toFormValues(profile),
    mode: "onBlur",
  });
  const { append, fields, remove } = useFieldArray({
    control,
    name: "skills",
    keyName: "fieldKey",
  });

  const fullName = useWatch({ control, name: "fullName" });
  const profilePhoto = useWatch({ control, name: "profilePhoto" });
  const careerGoal = useWatch({ control, name: "careerGoal" });
  const learningStyle = useWatch({ control, name: "learningStyle" });
  const weeklyStudyHours = useWatch({ control, name: "weeklyStudyHours" });

  useEffect(() => {
    reset(toFormValues(profile));
  }, [profile, reset]);

  const languageOptions = useMemo(() => {
    const current = profile.preferredProgrammingLanguage;
    return current && !programmingLanguages.includes(current as (typeof programmingLanguages)[number])
      ? [current, ...programmingLanguages]
      : programmingLanguages;
  }, [profile.preferredProgrammingLanguage]);

  async function submitProfile(values: ProfileFormValues) {
    setSuccessMessage(null);
    saveMutation.reset();

    try {
      const response = await saveMutation.mutateAsync(values);
      reset(toFormValues(response.data));
      setSuccessMessage(response.message ?? "Profile saved successfully.");
      await refreshSession();
      router.refresh();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // Mutation state renders the server-safe error below the form.
    }
  }

  function restoreSavedProfile() {
    reset(toFormValues(profile));
    setSuccessMessage(null);
    saveMutation.reset();
  }

  const mutationError =
    saveMutation.error instanceof Error
      ? saveMutation.error.message
      : "Your changes could not be saved.";

  return (
    <div className="section-shell py-8 sm:py-10 lg:py-12">
      {successMessage ? <div className="mb-5"><SaveSuccess message={successMessage} /></div> : null}
      <ProfileHero profile={profile} />

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="glass-panel rounded-[1.75rem] bg-white/75 p-4 lg:sticky lg:top-24 dark:bg-slate-900/65">
          <p className="px-3 pb-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
            Profile settings
          </p>
          <nav aria-label="Profile sections" className="grid gap-1">
            {profileNavigation.map(({ href, icon: Icon, label }) => (
              <a
                className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground outline-none transition hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-slate-800 dark:hover:text-cyan-300"
                href={href}
                key={href}
              >
                <Icon aria-hidden="true" className="size-4.5" />
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-4 text-white shadow-lg shadow-blue-500/15">
            <Sparkles aria-hidden="true" className="size-5 text-cyan-100" />
            <p className="mt-3 text-sm font-bold">Recommendation engine</p>
            <p className="mt-1 text-xs leading-5 text-blue-50">
              {profile.recommendations.status === "refresh_pending"
                ? "Your updated learning direction is queued for the AI phase."
                : "Your profile is ready to guide personalized recommendations."}
            </p>
            <span className="mt-3 inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
              Profile v{profile.recommendations.version}
            </span>
          </div>
        </aside>

        <div className="grid min-w-0 gap-6">
        <form className="grid min-w-0 gap-6" noValidate onSubmit={handleSubmit(submitProfile)}>
          <ProfileSection
            description="Manage the account details and learning context that identify you across SkillForge AI."
            icon={UserRound}
            id="identity"
            title="Personal information"
          >
            <div className="mb-7 flex flex-col gap-5 rounded-2xl border border-border/70 bg-muted/35 p-5 sm:flex-row sm:items-center">
              <ProfileAvatar name={fullName} photo={profilePhoto} />
              <div className="min-w-0 flex-1">
                <p className="font-bold">Profile photo preview</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Use a secure image URL from Google, Cloudinary, or another trusted host.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  <Check aria-hidden="true" className="size-4" />
                  Updates your avatar across the authenticated workspace
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <ProfileField
                error={errors.fullName?.message}
                htmlFor="profile-name"
                icon={UserRound}
                label="Full name"
              >
                <input
                  aria-invalid={Boolean(errors.fullName)}
                  className={fieldClassName}
                  id="profile-name"
                  placeholder="Your full name"
                  {...register("fullName")}
                />
              </ProfileField>

              <ProfileField
                hint="Email changes require a verified account flow and are managed by authentication."
                htmlFor="profile-email"
                icon={Mail}
                label="Email address"
              >
                <div className="relative">
                  <input
                    className={cn(fieldClassName, "pr-11")}
                    disabled
                    id="profile-email"
                    type="email"
                    value={profile.email}
                  />
                  <LockKeyhole aria-hidden="true" className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                </div>
              </ProfileField>

              <div className="md:col-span-2">
                <ProfileField
                  error={errors.profilePhoto?.message}
                  htmlFor="profile-photo"
                  icon={ImageIcon}
                  label="Profile photo URL"
                >
                  <input
                    aria-invalid={Boolean(errors.profilePhoto)}
                    className={fieldClassName}
                    id="profile-photo"
                    placeholder="https://images.example.com/your-photo.jpg"
                    type="url"
                    {...register("profilePhoto")}
                  />
                </ProfileField>
              </div>

              <ProfileField
                error={errors.currentEducation?.message}
                hint="For example: BSc in Computer Science or self-taught learner."
                htmlFor="profile-education"
                icon={GraduationCap}
                label="Current education"
              >
                <input
                  aria-invalid={Boolean(errors.currentEducation)}
                  className={fieldClassName}
                  id="profile-education"
                  placeholder="BSc Computer Science — Year 3"
                  {...register("currentEducation")}
                />
              </ProfileField>

              <ProfileField
                error={errors.currentRole?.message}
                hint="Your present role, employment status, or learner stage."
                htmlFor="profile-role"
                icon={BriefcaseBusiness}
                label="Current role"
              >
                <input
                  aria-invalid={Boolean(errors.currentRole)}
                  className={fieldClassName}
                  id="profile-role"
                  placeholder="Student, intern, or junior developer"
                  {...register("currentRole")}
                />
              </ProfileField>

              <div className="md:col-span-2">
                <ProfileField
                  error={errors.bio?.message}
                  hint="A short introduction gives the AI more context about your background and motivation."
                  htmlFor="profile-bio"
                  icon={FileText}
                  label="Bio"
                >
                  <textarea
                    aria-invalid={Boolean(errors.bio)}
                    className={cn(fieldClassName, "min-h-28 resize-y py-3")}
                    id="profile-bio"
                    placeholder="Tell us about yourself, what you are learning, and where you want to go…"
                    {...register("bio")}
                  />
                </ProfileField>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection
            description="Tell the mentor where you are heading and how you learn best. Saving a new career goal queues refreshed AI recommendations."
            icon={BriefcaseBusiness}
            id="career"
            title="Career & learning preferences"
          >
            <fieldset>
              <legend className="flex items-center gap-2 text-sm font-bold">
                <Target aria-hidden="true" className="size-4 text-blue-600 dark:text-cyan-300" />
                Career goal
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {careerOptions.map(({ icon: Icon, note, value }) => {
                  const selected = careerGoal === value;
                  return (
                    <button
                      aria-pressed={selected}
                      className={cn(
                        "relative min-h-32 rounded-2xl border p-4 text-left outline-none transition duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 focus-visible:ring-4 focus-visible:ring-blue-500/15",
                        selected
                          ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-500/10 dark:border-cyan-400 dark:bg-cyan-950/30"
                          : "border-border bg-background/65 dark:bg-slate-950/30",
                      )}
                      key={value}
                      onClick={() => setValue("careerGoal", value, { shouldDirty: true, shouldValidate: true })}
                      type="button"
                    >
                      <span className={cn("grid size-10 place-items-center rounded-xl bg-muted text-muted-foreground", selected && "bg-blue-600 text-white dark:bg-cyan-400 dark:text-slate-950")}>
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="mt-3 block text-sm font-bold">{value}</span>
                      <span className="mt-1 block text-xs leading-5 text-muted-foreground">{note}</span>
                      {selected ? <Check aria-hidden="true" className="absolute right-3 top-3 size-4 text-blue-600 dark:text-cyan-300" /> : null}
                    </button>
                  );
                })}
              </div>
              {errors.careerGoal?.message ? <p className="mt-2 text-sm font-semibold text-destructive">{errors.careerGoal.message}</p> : null}
            </fieldset>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <ProfileField htmlFor="experience-level" icon={BookOpen} label="Experience level">
                <select className={fieldClassName} id="experience-level" {...register("experienceLevel")}>
                  <option value="">Select your level</option>
                  {experienceLevels.map((level) => <option key={level}>{level}</option>)}
                </select>
              </ProfileField>

              <ProfileField htmlFor="programming-language" icon={Languages} label="Preferred programming language">
                <input
                  className={fieldClassName}
                  id="programming-language"
                  list="programming-language-options"
                  placeholder="Choose or type a language"
                  {...register("preferredProgrammingLanguage")}
                />
                <datalist id="programming-language-options">
                  {languageOptions.map((language) => <option key={language} value={language} />)}
                </datalist>
              </ProfileField>

              <div className="md:col-span-2 rounded-2xl border border-border/75 bg-muted/30 p-5">
                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm font-bold" htmlFor="weekly-hours">
                    <Clock3 aria-hidden="true" className="size-4 text-blue-600 dark:text-cyan-300" />
                    Weekly study hours
                  </label>
                  <output className="rounded-full bg-blue-600 px-3 py-1.5 text-sm font-bold text-white" htmlFor="weekly-hours">
                    {weeklyStudyHours}h / week
                  </output>
                </div>
                <input
                  className="mt-5 h-2 w-full cursor-pointer accent-blue-600"
                  id="weekly-hours"
                  max="80"
                  min="1"
                  type="range"
                  {...register("weeklyStudyHours", { valueAsNumber: true })}
                />
                <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground">
                  <span>1 hour</span>
                  <span>80 hours</span>
                </div>
              </div>

              <fieldset className="md:col-span-2">
                <legend className="text-sm font-bold">Preferred learning style</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {learningStyles.map((style) => (
                    <button
                      aria-pressed={learningStyle === style}
                      className={cn(
                        "min-h-12 rounded-xl border px-3 py-2 text-sm font-semibold outline-none transition hover:border-blue-400 focus-visible:ring-4 focus-visible:ring-blue-500/15",
                        learningStyle === style
                          ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/15 dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                          : "border-border bg-background/70 text-muted-foreground dark:bg-slate-950/30",
                      )}
                      key={style}
                      onClick={() => setValue("learningStyle", style, { shouldDirty: true, shouldValidate: true })}
                      type="button"
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </ProfileSection>

          <ProfileSection
            description="Map what you know, how confident you feel, and whether each skill is still in progress."
            icon={Wrench}
            id="skills"
            title="Technical skills"
          >
            <SkillsEditor
              append={append}
              control={control}
              errors={errors}
              fields={fields}
              register={register}
              remove={remove}
            />
          </ProfileSection>

          {saveMutation.isError ? (
            <p className="rounded-2xl border border-destructive/25 bg-destructive/10 p-4 text-sm font-semibold text-destructive" role="alert">
              {mutationError}
            </p>
          ) : null}

          <div className="glass-panel sticky bottom-4 z-20 flex flex-col gap-3 rounded-2xl bg-white/85 p-4 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-900/85">
            <div>
              <p className="text-sm font-bold">{isDirty ? "You have unsaved changes" : "Everything is up to date"}</p>
              <p className="mt-1 text-xs text-muted-foreground">Your learning profile remains private to your account.</p>
            </div>
            <div className="flex gap-2">
              <Button className="h-11 flex-1 rounded-xl px-4 sm:flex-none" disabled={!isDirty || saveMutation.isPending} onClick={restoreSavedProfile} type="button" variant="outline">
                <RotateCcw aria-hidden="true" />
                Reset
              </Button>
              <Button className="h-11 flex-1 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 px-5 font-bold text-white shadow-lg shadow-blue-500/20 hover:brightness-105 sm:flex-none" disabled={!isDirty || saveMutation.isPending} type="submit">
                {saveMutation.isPending ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <Save aria-hidden="true" />}
                {saveMutation.isPending ? "Saving…" : "Save profile"}
              </Button>
            </div>
          </div>
        </form>
        <AccountSecurity />
        </div>
      </div>
    </div>
  );
}

export function ProfileWorkspace() {
  const router = useRouter();
  const session = authClient.useSession();
  const profileQuery = useProfile(Boolean(session.data?.user));

  useEffect(() => {
    if (!session.isPending && !session.data?.user) {
      router.replace("/login");
    }
  }, [router, session.data?.user, session.isPending]);

  if (session.isPending || (!session.data?.user && !session.error)) {
    return <ProfileLoading />;
  }

  if (!session.data?.user) return <ProfileLoading />;

  if (profileQuery.isPending) return <ProfileLoading />;

  if (profileQuery.isError || !profileQuery.data) {
    return (
      <ProfileError
        message={profileQuery.error instanceof Error ? profileQuery.error.message : "Please try again."}
        retry={() => void profileQuery.refetch()}
      />
    );
  }

  return (
    <ProfileEditor
      profile={profileQuery.data}
      refreshSession={() => session.refetch()}
    />
  );
}
