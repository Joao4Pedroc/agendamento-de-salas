import Link from "next/link";

function ButtonLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
