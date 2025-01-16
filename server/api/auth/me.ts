import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "authorization");
  const prisma = new PrismaClient();
  if (!authHeader) {
    throw createError({ statusCode: 401, message: "No token provided" });
  }

  const token = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) throw new Error("User not found");

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    throw createError({ statusCode: 401, message: "Invalid token" });
  }
});
