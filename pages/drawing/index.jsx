import { useEffect, useState } from "react";
import { prisma } from "../../server/db/client";
import Link from "next/link";
import Image from "next/image";
import Pixels from "../../components/Pixels";

export default function AllDrawings({ drawings }) {
  return (
    <div>
      {drawings.map((drawing) => (
        <div
          key={drawing.id}
          className="h-screen py-10 flex flex-col gap-10 items-center"
        >
          <div className="text-center">
            <Link href={`/drawing/${drawing.id}`}>
              <h2 className="text-5xl font-bold">{drawing.title}</h2>
            </Link>
            <p>
              Created at{" "}
              {new Date(drawing.createdAt).toLocaleString("default", {
                hour12: false,
              })}
            </p>
            <p>By</p>
            <div className="flex items-center justify-center gap-4">
              <Image src={drawing.user.image} width={40} height={40} alt=""/>
              <p>{drawing.user.name}</p>
            </div>
          </div>
          <div className="flex flex-col max-h-screen items-center h-5/6">
            <Pixels pixelColors={drawing.pixels} />
          </div>
          <div className="border-2 border-black w-4/5"></div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const drawings = await prisma.pixelArt.findMany({ include: { user: true } });
  return { props: { drawings: JSON.parse(JSON.stringify(drawings)) } };
}
