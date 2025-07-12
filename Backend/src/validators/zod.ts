import { z } from "zod";

const SIZE = ["xs", "s", "m", "l", "xla"] as const;
const CONDITION = ["NEW", "USED", "GOOD", "FAIR", "POOR"] as const;

export const itemCreateSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Description is required"),
  category: z.string().min(2, "Category is required"),
  size: z.enum(SIZE, { errorMap: () => ({ message: "Invalid size" }) }),
  point: z.number().min(1, "Point must be at least 1"),
  condition: z.enum(CONDITION, {
    errorMap: () => ({ message: "Invalid condition" }),
  }),
  userid: z.string().uuid("Invalid user ID"),
});

export const registerUserSchema = z.object({
  username: z.string().trim().min(2, "Username is required"),
  email: z.string().trim().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginUserSchema = z.object({
  email: z.string().trim().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
