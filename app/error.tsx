"use client";

import Link from "next/link";

export default function Error({ error, reset }: any) {
  return (
    <main className="flex justify-center items-center flex-col gap-6 mt-10">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button className="inline-block px-6 py-3 text-lg" onClick={reset}>
        Try again
      </button>
      <p className="text-lg">Or go back to the home page!</p>
      <Link href="/" className="inline-block px-6 py-3 text-lg">
        Home
      </Link>
    </main>
  );
}
