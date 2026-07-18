import {
  BadgeCheck,
  BarChart3,
  Blocks,
  BookOpenCheck,
  Bot,
  BrainCircuit,
  Code2,
  Layers3,
  Lightbulb,
  MessagesSquare,
  Monitor,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  UserRound,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";

export type IconContent = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const learningFeatures: IconContent[] = [
  {
    icon: BrainCircuit,
    title: "Personalized Learning",
    description:
      "Every roadmap adapts to your current skills, career goal, and the time you can study each week.",
  },
  {
    icon: MessagesSquare,
    title: "AI Career Mentor",
    description:
      "Get contextual guidance from an AI mentor that understands your roadmap, progress, and previous questions.",
  },
  {
    icon: Code2,
    title: "Project-Based Learning",
    description:
      "Turn each learning milestone into a practical project that strengthens your portfolio and technical confidence.",
  },
  {
    icon: BadgeCheck,
    title: "Interview Preparation",
    description:
      "Practice targeted technical questions based on the topics and projects you have already completed.",
  },
];

export const careerPaths = [
  {
    icon: Monitor,
    title: "Frontend Developer",
    description: "Build responsive, accessible interfaces with modern web technologies.",
    duration: "5–7 months",
    slug: "frontend-developer",
  },
  {
    icon: Server,
    title: "Backend Developer",
    description: "Design secure APIs, databases, and scalable application services.",
    duration: "6–8 months",
    slug: "backend-developer",
  },
  {
    icon: Layers3,
    title: "Full Stack Developer",
    description: "Connect polished user experiences with dependable server-side systems.",
    duration: "8–12 months",
    slug: "full-stack-developer",
  },
  {
    icon: Palette,
    title: "UI/UX Designer",
    description: "Research, prototype, and craft intuitive digital product experiences.",
    duration: "4–6 months",
    slug: "ui-ux-designer",
  },
  {
    icon: Smartphone,
    title: "Mobile App Developer",
    description: "Create fast, user-friendly applications for mobile platforms.",
    duration: "6–9 months",
    slug: "mobile-app-developer",
  },
  {
    icon: Bot,
    title: "AI Engineer",
    description: "Build intelligent products with machine learning and generative AI.",
    duration: "9–12 months",
    slug: "ai-engineer",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    description: "Protect applications, networks, and data from modern threats.",
    duration: "7–10 months",
    slug: "cyber-security",
  },
  {
    icon: BarChart3,
    title: "Data Analyst",
    description: "Transform raw data into clear insights and business decisions.",
    duration: "5–7 months",
    slug: "data-analyst",
  },
];

export const journeySteps: IconContent[] = [
  {
    icon: UserRound,
    title: "Create Profile",
    description: "Tell us about your skills, experience, weekly schedule, and target role.",
  },
  {
    icon: WandSparkles,
    title: "Generate AI Roadmap",
    description: "Receive a focused plan with weekly milestones, resources, and checkpoints.",
  },
  {
    icon: BookOpenCheck,
    title: "Start Learning",
    description: "Follow a clear sequence so every new concept builds on the previous one.",
  },
  {
    icon: Blocks,
    title: "Build Projects",
    description: "Apply your skills through practical work designed for a stronger portfolio.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "See completed milestones, learning streaks, and areas that need attention.",
  },
  {
    icon: Lightbulb,
    title: "Receive Recommendations",
    description: "Get the next best topic, project, or revision task based on your progress.",
  },
  {
    icon: BadgeCheck,
    title: "Prepare for Interviews",
    description: "Practice role-specific questions and close knowledge gaps with AI feedback.",
  },
];

export const frequentlyAskedQuestions = [
  {
    question: "How does SkillForge AI create my roadmap?",
    answer:
      "SkillForge considers your current skills, experience level, weekly availability, and career target. It then structures the most relevant topics, projects, and checkpoints into a realistic learning sequence.",
  },
  {
    question: "Can I explore roadmaps before creating an account?",
    answer:
      "Yes. Public career roadmaps can be explored without an account. Creating an account unlocks personalization, progress tracking, saved projects, and AI mentor context.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "The initial learning tools and public roadmaps are designed to be accessible for free. Any future premium AI usage will be explained clearly before you choose to upgrade.",
  },
  {
    question: "What can the AI Mentor help me with?",
    answer:
      "The mentor can explain concepts, help debug learning projects, suggest next steps, review your progress, and prepare interview questions that match your active roadmap.",
  },
  {
    question: "Where do the learning resources come from?",
    answer:
      "Roadmaps combine carefully selected documentation, courses, practice exercises, and project briefs. Resources are organized by difficulty and aligned with each milestone.",
  },
  {
    question: "How is my learning progress tracked?",
    answer:
      "You can complete topics, tasks, and projects from your dashboard. SkillForge uses those updates to calculate progress, identify weak areas, and adjust future recommendations.",
  },
];
