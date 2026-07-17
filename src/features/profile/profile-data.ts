export const careerGoals = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "AI Engineer",
  "Data Analyst",
] as const;

export const experienceLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const learningStyles = [
  "Visual",
  "Hands-on",
  "Reading",
  "Project-based",
  "Mixed",
] as const;

export const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "PHP",
  "Kotlin",
  "Swift",
  "Rust",
] as const;

export const proficiencyLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

export const skillStatuses = ["Learning", "Practicing", "Completed"] as const;

export type CareerGoal = (typeof careerGoals)[number];
export type ExperienceLevel = (typeof experienceLevels)[number];
export type LearningStyle = (typeof learningStyles)[number];
export type ProficiencyLevel = (typeof proficiencyLevels)[number];
export type SkillStatus = (typeof skillStatuses)[number];

export type Skill = {
  id: string;
  name: string;
  proficiency: ProficiencyLevel;
  status: SkillStatus;
};

export type UserProfile = {
  userId: string;
  fullName: string;
  email: string;
  profilePhoto: string | null;
  currentEducation: string;
  currentRole: string;
  bio: string;
  experienceLevel: ExperienceLevel | "";
  careerGoal: CareerGoal | "";
  weeklyStudyHours: number;
  learningStyle: LearningStyle | "";
  preferredProgrammingLanguage: string;
  skills: Skill[];
  profileCompletion: number;
  recommendations: {
    status: "ready" | "refresh_pending";
    version: number;
  };
  createdAt: string | null;
  updatedAt: string | null;
};
