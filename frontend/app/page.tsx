"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const session = useSession();
  return (
    <>
      <div>
        <h1>
          Welcome to the <span>Next.js</span> + <span>NextAuth.js</span> starter
          template!
        </h1>
        <pre
          className="p-4 mt-4 text-sm bg-gray-100 rounded-md"
        >
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}
