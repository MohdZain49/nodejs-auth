import jwt from "jsonwebtoken";
import ENV from "../config/env";

export const createAccessToken = (
  userId: string,
  role: "user" | "admin",
  tokenVersion: number,
) => {
  const payload = {
    sub: userId,
    role,
    tokenVersion,
  };

  return jwt.sign(payload, ENV.JWT_ACCESS_SECRET!, {
    expiresIn: "30m",
  });
};

export const createRefreshToken = (userId: string, tokenVersion: number) => {
  const payload = {
    sub: userId,
    tokenVersion,
  };

  return jwt.sign(payload, ENV.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_REFRESH_SECRET!) as {
    sub: string;
    tokenVersion: number;
  };
}