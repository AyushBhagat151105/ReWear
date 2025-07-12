export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none",
} as const;

export const userRoleEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export const itemStatusEnum = {
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PENDING: "PENDING",
};
