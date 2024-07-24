"use client";

import Image from "next/image";
import Link from "next/link";
import { HiMiniUser } from "react-icons/hi2";
import { checkLoggedIn } from "../_Helper/checkLoggedIn";
import { useEffect, useState } from "react";
import Logout from "./Logout";

function Header() {
  const [isLogged, setIsLogged] = useState<string | null>();

  useEffect(() => {
    async function checkUser() {
      try {
        const { token, isLoading } = await checkLoggedIn();
        setIsLogged(token);
        console.log(isLogged);
        console.log();
        if (!token) throw new Error("Não foi possivel carregar as informações");
      } catch (error) {
        console.error(error);
      }
    }

    checkUser();
  }, [isLogged]);

  return (
    <header className="flex justify-between">
      <Link href="/">
        <Image
          src="/logo_fepecs.png"
          width={100}
          height={100}
          alt="fepecs logo"
        />
      </Link>
      <div className="pr-10 flex mt-5 gap-5">
        {isLogged ? (
          <Logout />
        ) : (
          <a href="/login" className="pr-5 font-bold">
            login
          </a>
        )}

        <HiMiniUser className="w-7 h-7" />
      </div>
    </header>
  );
}

export default Header;
