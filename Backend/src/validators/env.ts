import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().optional(),
  BASEURL: z.string().min(1, { message: "Base is required" }),
  NODE_ENV: z.string().min(1, { message: "NODE_ENV is required" }).optional(),
  CLOUDINARY_CLOUD_NAME: z
    .string()
    .min(1, { message: "CLOUDINARY_CLOUD_NAME is required" }),
  CLOUDINARY_API_KEY: z
    .string()
    .min(1, { message: "CLOUDINARY_API_KEY is required" }),
  CLOUDINARY_API_SECRET: z
    .string()
    .min(1, { message: "CLOUDINARY_API_SECRET is required" }),
  ACCESS_TOKEN_SECRET: z
    .string()
    .min(1, { message: "ACCESS_TOKEN_SECRET is required" }),
  REFRESH_TOKEN_SECRET: z
    .string()
    .min(1, { message: "REFRESH_TOKEN_SECRET is required" }),
  ORIGIN_URL: z.string().min(1, { message: "ORIGIN_URL is required" }),
});
function createENV(env: NodeJS.ProcessEnv) {
  const validationResult = envSchema.safeParse(env);

  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }

  return validationResult.data;
}

export const env = createENV(process.env);
