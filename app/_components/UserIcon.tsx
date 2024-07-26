"use client";

import { useEffect, useState } from "react";
import { HiMiniUser } from "react-icons/hi2";
import Logout from "./Logout";
import Login from "./Login";
import { getUserAdmin } from "../_services/apiUser";

export default function UserIcon({ userId }: { userId: string | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function checkUserId() {
      try {
        const user = await getUserAdmin({ userId });
        setUser(user);
        if (!user) throw new Error("Não foi possivel carregar as informações");
      } catch (error) {
        console.error(error);
      }
    }

    checkUserId();
  }, [userId]);

  return (
    <div className="relative flex flex-col items-center rounded-lg">
      <button onClick={() => setIsOpen(!isOpen)}>
        <HiMiniUser className="w-7 h-7" />
      </button>
      {userId
        ? isOpen && (
            <div className="bg-gray-100 absolute top-10 flex flex-col items-start rounded-md p-2 shadow-md ">
              <ul className="text-center font-normal">
                <li className="border-b border-gray-500">Configurações</li>
                <li className="border-b border-gray-500">
                  <a href="/salas">Salas</a>
                </li>

                {user[0]?.admin === true ? (
                  <li className=" border-b border-gray-500">
                    <a href="/pendentes">Agendamentos pendentes</a>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <Logout />
                </li>
              </ul>
            </div>
          )
        : isOpen && (
            <div className="bg-gray-100 absolute top-10 flex flex-col items-start rounded-md p-2 shadow-md ">
              <ul className="text-center font-normal">
                <li>
                  <Login />
                </li>
              </ul>
            </div>
          )}
    </div>
  );
}
