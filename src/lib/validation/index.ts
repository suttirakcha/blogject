import * as z from "zod"

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Username cannot be empty" }),
  email: z.string().min(1, { message: "Email cannot be empty" }).email("Invalid email"),
  password: z.string().min(8, { message:"Password must be at least 8 characters." })
})

export const signinSchema = z.object({
  email: z.string().min(1, { message: "Please enter your email."}).email("Invalid email"),
  password: z.string().min(1, { message: "Please enter your password." }).min(8, { message:"Password must be at least 8 characters." })
})

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty"}),
  content: z.string().min(1, { message: "Content cannot be empty" }),
  file: z.custom<File[]>(),
  tags: z.string()
})

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty"}),
  email: z.string().min(1, { message: "Email cannot be empty"}),
  file: z.custom<File[]>(),
  bio: z.string().max(500),
})

