import { z } from "zod";

const strongPassword = z
  .string()
  .min(8, "Use at least 8 characters.")
  .max(128)
  .regex(/[a-z]/, "Include a lowercase letter.")
  .regex(/[A-Z]/, "Include an uppercase letter.")
  .regex(/\d/, "Include a number.")
  .regex(/[^A-Za-z0-9]/, "Include a special character.");

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password."),
    newPassword: strongPassword,
    confirmPassword: z.string(),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const deleteAccountSchema = z.object({
  confirmation: z
    .string()
    .refine((value): boolean => value === "DELETE", "Type DELETE exactly to confirm."),
  password: z.string(),
});

export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
export type DeleteAccountValues = z.infer<typeof deleteAccountSchema>;
