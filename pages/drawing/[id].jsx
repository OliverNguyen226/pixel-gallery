import { prisma } from "../../server/db/client";
import Image from "next/image";
import Pixels from "../../components/Pixels";

export default function Drawing({ drawing }) {
  return (
    <div className="h-screen py-10 flex flex-col gap-10">
      {console.log(drawing, drawing.user)}
      <div className="text-center">
        <h2 className="text-5xl">{drawing.title}</h2>
        <p>Created at {new Date(drawing.createdAt).toLocaleString()}</p>
        <p>By</p>
        <div className="flex items-center justify-center gap-4">
          <Image src={drawing.user.image} width={40} height={40} alt=""/>
          <p>{drawing.user.name}</p>
        </div>
      </div>
      <div className="flex flex-col max-h-screen items-center h-5/6">
        <Pixels pixelColors={drawing.pixels} />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const drawings = await prisma.pixelArt.findMany();
  const paths = drawings.map((drawing) => ({
    params: { id: drawing.id.toString() },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const drawingId = +context.params.id;
  const drawing = await prisma.pixelArt.findUnique({
    where: { id: drawingId },
    include: {
      user: true,
    },
  });
  return { props: { drawing: JSON.parse(JSON.stringify(drawing)) } };
}
