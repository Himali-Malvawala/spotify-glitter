import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../utils/client";

export default async function albumDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const albumID = parseInt(req.query.album_id as string);
  const { name, image } = JSON.parse(req.body);

  if (req.method === "GET") {
    try {
      const response = await prisma.album.findUnique({
        where: { id: albumID },
      });
      res.status(200).json({ response });
    } catch (error) {
      res.status(404).json({ message: "Couldn't find the mentioned album" });
    }
  }

  if (req.method === "PUT") {
    try {
      const response = await prisma.album.update({
        where: { id: albumID },
        data: {
          name,
          image,
        },
      });
      res.status(200).json({ response });
    } catch (error) {
      res.status(404).json({ message: "Couldn't update the mentioned album" });
    }
  }
  if (req.method === "DELETE") {
    try {
      const response = await prisma.album.delete({
        where: { id: albumID },
      });
      res.status(200).json({ message: "Album deleted!" });
    } catch (error) {
      res.status(404).json({ message: "couldn't delete the mentioned album" });
    }
  }
}
