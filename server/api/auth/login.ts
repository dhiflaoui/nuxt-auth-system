import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  // Input validation
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Enhanced security check
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  // Log successful login and update last login timestamp
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLoginAt: new Date(),
    },
  });

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
      algorithm: "HS256",
    }
  );

  return {
    token,
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      lastLoginAt: updatedUser.lastLoginAt,
    },
  };
});
