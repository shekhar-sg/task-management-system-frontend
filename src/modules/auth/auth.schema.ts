import {z} from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .trim()
    .min(6, { error: "Password must be at least 8 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .min(2, { error: "Name must be at least 2 characters" })
      .max(50, { error: "Name must not exceed 50 characters" }),
    email: z.email({ error: "Invalid email address" }),
    password: z
      .string({ error: "Password is required" })
      .trim()
      .min(6, { error: "Password must be at least 8 characters" })
      .max(100, { error: "Password must not exceed 100 characters" }),
    confirmPassword: z.string({ error: "Please confirm your password" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
