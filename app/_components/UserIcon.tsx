import { useState } from "react";
import { HiMiniUser } from "react-icons/hi2";
import Logout from "./Logout";
import Login from "./Login";

export default function UserIcon({ isLogged }: { isLogged: string | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col items-center rounded-lg">
      <button onClick={() => setIsOpen(!isOpen)}>
        <HiMiniUser className="w-7 h-7" />
      </button>
      {isLogged
        ? !isOpen && (
            <div className="bg-gray-400 absolute top-10 flex flex-col items-start rounded-md p-2 ">
              <ul className="text-center font-normal">
                <li>Configurações</li>
                <li>Salas</li>
                <li>
                  <Logout />
                </li>
                <li>test</li>
              </ul>
            </div>
          )
        : !isOpen && (
            <div className="bg-gray-400 absolute top-10 flex flex-col items-start rounded-md p-2 ">
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
