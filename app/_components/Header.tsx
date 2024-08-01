"use client";

import Image from "next/image";
import Link from "next/link";

import { checkLoggedIn } from "../_Helper/checkLoggedIn";
import { useEffect, useState } from "react";
import Logout from "./Logout";
import Login from "./Login";
import UserIcon from "./UserIcon";
import { toast } from "react-toastify";

function Header() {
  const [isLogged, setIsLogged] = useState<string | null>();

  useEffect(() => {
    async function checkUser() {
      try {
        const { id, isLoading } = await checkLoggedIn();
        setIsLogged(id);
        if (!id) throw new Error("Não foi possivel carregar as informações");
      } catch (error) {
        toast.error("Ocorreu um erro no agendamento, tente novamente.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      <div className="mr-10 flex mt-5 gap-4 items-center font-bold">
        {isLogged ? <Logout /> : <Login />}

        <UserIcon userId={isLogged} />
      </div>
    </header>
  );
}

export default Header;
