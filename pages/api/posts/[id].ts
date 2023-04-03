import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prismaService = new PrismaClient();

export class PostNotFound extends Error {
  constructor() {
    super("Post does not exists.");
  }
}

export default async function post(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const post = await prismaService.post.findUnique({ where: { id } });

  if (!post) throw new PostNotFound();

  switch (req.method) {
    case "GET":
      return res.status(200).json({ post });

    case "PUT":
      const { text } = req.body;

      await prismaService.post.update({
        where: { id },
        data: { text },
      });

      return res
        .status(200)
        .json({ message: "Post has updated successfully." });

    case "DELETE":
      await prismaService.post.delete({ where: { id } });
      return res
        .status(200)
        .json({ message: "Post has deleted successfully." });
  }
}
