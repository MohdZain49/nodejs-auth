import type { Response } from "express";
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
      ENV.JWT_ACCESS_SECRET,
      {
        expiresIn: "1d",
      },
    );

    const verifyUrl = `${getAppUrl()}/auth/verify-email?token=${verifyToken}`;

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
