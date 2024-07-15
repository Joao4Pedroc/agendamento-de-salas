import Image from "next/image";
import { Sala } from "./types";

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
        <span>sala {sala.nome}</span>
        <ul>
          <li>capacidade {sala.capacidade}</li>
          <li>{sala.televisão ? "televisao" : ""}</li>
          <li>{sala.internet ? "internet" : ""}</li>
        </ul>
      </div>
      <span>Visualizar disponibilidade</span>
    </div>
  );
}

export default Salas;
