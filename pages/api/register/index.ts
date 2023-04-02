import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const prismaService = new PrismaClient();

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, password }: IRequest = req.body;

  const foundUser = await prismaService.user.findUnique({ where: { email } });

  if (foundUser) throw new Error("Email already exists.");

  const hashPassword = bcrypt.hashSync(password, 12);

  await prismaService.user.create({
    data: { name, email, password: hashPassword },
  });

  return res.status(201).json({ message: "User has registered successfully." });
}
