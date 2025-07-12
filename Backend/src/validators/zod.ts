import { z } from "zod";

const SIZE = ["xs", "s", "m", "l", "xla"] as const;
const CONDITION = ["NEW", "USED", "GOOD", "FAIR", "POOR"] as const;

export const registerSchema = z.object({
  title: z.string().min(2, "Name is Required"),
  description: z.string().min(5, "Description Required"),
  category: z.object({
    name: z.string().min(2, "Category is Required"),
  }),
  size: z.enum(SIZE),
  point: z.number().min(1, "Point is Required"),
  condition: z.enum(CONDITION),
});
