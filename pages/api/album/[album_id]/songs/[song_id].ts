import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../utils/client";

export default async function songDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const songID = parseInt(req.query.song_id as string);
    try {
      const response = await prisma.songs.findUnique({
        where: { id: songID },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: "Couldn't find the mentioned song" });
    }
  }

  if (req.method === "PUT") {
    const songID = parseInt(req.query.song_id as string);
    const { name, image } = req?.body;
    try {
      const response = await prisma.songs.update({
        where: { id: songID },
        data: {
          name,
          image,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: "Couldn't update the mentioned song" });
    }
  }

  if (req.method === "DELETE") {
    const songID = parseInt(req.query.song_id as string);
    try {
      const response = await prisma.songs.delete({
        where: { id: songID },
      });
      res.status(200).json({ message: "Song deleted!" });
    } catch (error) {
      res.status(404).json({ message: "couldn't delete the mentioned song" });
    }
  }
}
