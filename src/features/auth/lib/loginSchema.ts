import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password is required" }),
  rememberMe: z.boolean(),
})

export type LoginForm = z.infer<typeof loginSchema>