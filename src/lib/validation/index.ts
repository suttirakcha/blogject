import * as z from "zod"

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Username cannot be empty" }),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, { message:"Password must be at least 8 characters." })
})

export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, { message:"Password must be at least 8 characters." })
})