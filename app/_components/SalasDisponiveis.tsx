"use client";

import { useEffect, useState } from "react";
import Salas from "./Salas";
import SearchBar from "./SearchBar";
import getSalas from "../_services/apiSalas";
import { Sala } from "./types";
import { HiCog8Tooth } from "react-icons/hi2";

function SalasDisponiveis({
  setSalaAtual,
  setShowModal,
}: {
  setSalaAtual: Function;
  setShowModal: Function;
}) {
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSalas();
        if (!data) throw new Error("Não foi possivel carregar as informações");
        setSalas(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="">
      <div className="flex">
        <div className="w-full">
          <SearchBar />
        </div>
        <button className="px-4 pb-3 text-[1.2rem]">
          <HiCog8Tooth />
        </button>
      </div>
      <span className="font-bold">Salas disponiveis: </span>
      <div>
        {salas.map((sala) => (
          <div className="py-2" key={sala.id}>
            <Salas
              sala={sala}
              setSalaAtual={setSalaAtual}
              setShowModal={setShowModal}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SalasDisponiveis;
