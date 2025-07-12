import { ZodError, ZodType, ZodTypeAny } from "zod";

type ValidationSuccess<T> = {
  success: true;
  data: T;
};

type ValidationFailure = {
  success: false;
  error: { path: string; message: string }[] | string;
};

export function validateSchema<T>(
  schema: ZodType<T, any, any>,
  data: unknown
): ValidationSuccess<T> | ValidationFailure {
  try {
    const parsed = schema.parse(data);
    return { success: true, data: parsed };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      };
    }
    return { success: false, error: "Unknown validation error" };
  }
}
