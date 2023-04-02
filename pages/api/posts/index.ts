import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prismaService = new PrismaClient();

export default async function posts(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const posts = await prismaService.post.findMany();
      return res.status(200).json({ posts });

    case "POST":
      try {
        const { text } = req.body;

        await prismaService.post.create({
          data: { text },
        });

        return res
          .status(201)
          .json({ message: "Post has created successfully." });
      } catch (error) {
        return res.status(500).json({ message: "Error creating a post." });
      }
    default:
      return res.status(405).json({ message: "Methond not allowed." });
  }
}
