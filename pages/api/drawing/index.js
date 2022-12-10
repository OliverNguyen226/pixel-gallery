import { prisma } from "../../../server/db/client";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "GET") {
  }

  if (req.method == "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!prismaUser) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const drawing = await prisma.pixelArt.create({
      data: {
        userId: prismaUser.id,
        pixels: JSON.parse(req.body.pixels),
        title: req.body.title,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({ message: "drawing saved", drawing });
  }
}
