import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/client";

export default async function songs(req: NextApiRequest, res: NextApiResponse) {
  const { name, image } = JSON.parse(req.body);
  const album_q_id = parseInt(req.query.album_id as string);

  if (req.method === "GET") {
    try {
      const response = await prisma.songs.findMany({
        where: { albumID: album_q_id },
      });
      res.status(200).json({ response });
    } catch (error) {
      res.status(404).json({ message: "No Songs found!" });
    }
  }
  if (req.method === "POST") {
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
      res.status(200).json({ response });
    } catch (error) {
      res.status(404).json({ message: "Error while creating a song" });
    }
  }
}
