import Image from "next/image";
import { Sala } from "./types";
import ButtonLink from "./ButtonLink";

function Salas({
  sala,
  setSalaAtual,
  setShowModal,
}: {
  sala: Sala;
  setSalaAtual: Function;
  setShowModal: Function;
}) {
  return (
    <div className="grid grid-cols-3 py-3 ">
      <Image
        className="rounded-md"
        src={sala.imagem}
        height={150}
        width={150}
        alt={`sala ${sala.nome}`}
      />
      <div>
        {/* <span>sala {sala.nome}</span> */}
        <ul className="font-medium ">
          <li>Capacidade: {sala.capacidade} pessoas</li>
          <li>{sala.televisão ? "Televisão" : "Não possui televisão"}</li>
          <li>{sala.internet ? "Internet" : "Não possui internet"}</li>
          <li className="text-blue-900 hover:text-blue-600 ">
            <button
              onClick={() => {
                setSalaAtual(sala);
                setShowModal(true);
              }}
            >
              Ver mais informações
            </button>
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
