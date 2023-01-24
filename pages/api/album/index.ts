import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/client";
// import { Prisma } from "@prisma/client";

export default async function albums(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const response = await prisma.album.findMany();
      res.status(200).json(response);
    } catch (error) {
      // if (error instanceof Prisma.PrismaClientInitializationError) {
      //   res.status(700).json({ message: "hit the spot" });
      // }
      res.status(404).json({ message: "No Albums found!", error });
    }
  }
  if (req.method === "POST") {
    const { name, image } = req?.body;
    try {
      const response = await prisma.album.create({
        data: {
          name,
          image,
        },
      });
      res.status(200).json({ message: "Album created!" });
    } catch (error) {
      res.status(404).json({ message: "Error while creating an album", error });
    }
  }
}
