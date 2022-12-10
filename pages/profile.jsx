import { signOut } from "next-auth/react";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { prisma } from "../server/db/client";
import Image from "next/image";
import axios from "axios";

export default function ProfilePage({ user }) {
  return (
    <div className="flex items-center flex-col gap-6">
      <h2 className="text-center text-4xl">Your Profile</h2>
      <div className="flex flex-col items-center gap-2 border border-black rounded-md p-2">
        <div className="flex gap-4 items-center justify-center">
          <Image src={user.image} width={40} height={40} alt=""/>
          <div>
            <p>Username: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="border border-black rounded-md w-fit p-2"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!prismaUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user = JSON.parse(JSON.stringify(prismaUser));

  return { props: { session, user } };
}
