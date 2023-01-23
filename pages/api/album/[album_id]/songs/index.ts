import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/client";

export default async function songs(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const album_q_id = parseInt(req.query.album_id as string);
    try {
      const response = await prisma.songs.findMany({
        where: { albumID: album_q_id },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: "No Songs found!", error });
    }
  }
  if (req.method === "POST") {
    const album_q_id = parseInt(req.query.album_id as string);
    const { name, image } = req?.body;
    try {
      const response = await prisma.songs.create({
        data: {
          name,
          image,
          album: {
            connect: {
              id: album_q_id,
            },
          },
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: "Error while creating a song", error });
    }
  }
}
