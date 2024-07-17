import Image from "next/image";
import { Sala } from "./types";
import ButtonLink from "./ButtonLink";

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
            <button>Ver mais informações</button>
          </li>
        </ul>
      </div>
      <div className="m-auto pb-5">
        <ButtonLink href={`/salas/${sala.id}`}>
          Visualizar disponibilidade
        </ButtonLink>
      </div>
    </div>
  );
}

export default Salas;
