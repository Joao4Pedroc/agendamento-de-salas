import Image from "next/image";
import { Sala } from "./types";
import Link from "next/link";

function Salas({ sala }: { sala: Sala }) {
  return (
    <div className="grid grid-cols-3 py-3">
      <Image
        src={sala.imagem}
        height={150}
        width={150}
        alt={`sala ${sala.nome}`}
      />
      <div>
        {/* <span>sala {sala.nome}</span> */}
        <ul>
          <li>capacidade {sala.capacidade}</li>
          <li>{sala.televisão ? "televisao" : ""}</li>
          <li>{sala.internet ? "internet" : ""}</li>
          <li className="text-blue-900">
            <Link href={`/salas/${sala.id}`}>Ver mais informações</Link>
          </li>
        </ul>
      </div>
      <div className="m-auto pb-5">
        <Link
          href={`/salas/${sala.id}/calendario`}
          className=" text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
        >
          Visualizar disponibilidade
        </Link>
      </div>
    </div>
  );
}

export default Salas;
