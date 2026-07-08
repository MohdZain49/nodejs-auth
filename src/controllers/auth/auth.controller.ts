import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import ENV from "../../config/env";

import { User } from "../../models/user.model";
import { registrationSchema } from "./auth.schema";

import { hashedPassword } from "../../lib/hash";
import sendEmail from "../../lib/email";

const getAppUrl = () => {
  return ENV.APP_URL || `http://localhost:${ENV.PORT}`;
};

export async function registerHandler(req: Request, res: Response) {
  try {
    const result = registrationSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid credentials",
        error: result.error.flatten(),
      });
    }

    const { name, email, password } = result.data;

    const normalizedEmail = email.toLowerCase().trim();

    const isUserExists = await User.findOne({
      email: normalizedEmail,
    });

    if (isUserExists) {
      return res.status(409).json({
        message: "User already exists!",
      });
    }

    const passwordHash = await hashedPassword(password);

    const newUser = await User.create({
      name,
      email: normalizedEmail,
      passwordHash,
      role: "user",
      isEmailVerified: false,
      twoFactorEnabled: false,
    });

    const verifyToken = jwt.sign(
      {
        sub: newUser.id,
      },
      ENV.JWT_EMAIL_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const verifyUrl = `${getAppUrl()}/api/v1/auth/verify-email?token=${verifyToken}`;

    await sendEmail(newUser.email, verifyUrl);

    return res.status(201).json({
      message: "User registered",
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        isEmailVerified: newUser.isEmailVerified,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function verifyEmailHandler(req: Request, res: Response) {
  try {
    const token = Array.isArray(req.query.token)
      ? req.query.token[0]
      : req.query.token;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        message: "Invalid Request",
      });
    }

    const payload = jwt.verify(token, ENV.JWT_EMAIL_SECRET) as jwt.JwtPayload;

    const userId = payload.sub;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (existingUser.isEmailVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    existingUser.isEmailVerified = true;
    await existingUser.save();

    return res.status(200).json({
      message: "Email verified",
    });
  } catch (err) {
    console.error(err);

    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Verification link expired",
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
