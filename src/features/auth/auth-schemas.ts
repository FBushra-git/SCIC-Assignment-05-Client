import { z } from "zod";

export const passwordRules = [
  { label: "8–128 characters", test: (value: string) => value.length >= 8 && value.length <= 128 },
  { label: "Uppercase and lowercase", test: (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value) },
  { label: "At least one number", test: (value: string) => /\d/.test(value) },
  { label: "At least one special character", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
] as const;

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(80, "Full name must be 80 characters or fewer."),
    email: z.string().trim().email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters.")
      .max(128, "Password must be 128 characters or fewer.")
      .refine((value) => passwordRules.slice(1).every((rule) => rule.test(value)), {
        message: "Use uppercase, lowercase, number, and special characters.",
      }),
    confirmPassword: z.string().min(1, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
  rememberMe: z.boolean(),
});

export type RegisterValues = z.infer<typeof registerSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
