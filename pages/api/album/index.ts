import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/client";

export default async function albums(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, image } = JSON.parse(req.body);

  if (req.method === "GET") {
    try {
      const response = await prisma.album.findMany();
      res.status(200).json({ response });
    } catch (error) {
      res.status(404).json({ message: "No Albums found!" });
    }
  }
  if (req.method === "POST") {
    try {
      const response = await prisma.album.create({
        data: {
          name,
          image,
        },
      });
      res.status(200).json({ message: "Album created!" });
    } catch (error) {
      res.status(404).json({ message: "Error while creating an album" });
    }
  }
}
