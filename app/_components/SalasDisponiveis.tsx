"use client";

import { useEffect, useState } from "react";
import Salas from "./Salas";
import SearchBar from "./SearchBar";
import { getSalas } from "../_services/apiSalas";
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
  let count = 0;

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
    <div className="border-solid border-gray-400 border-2 p-4 rounded-xl mt-8 pb-[5%]">
      <div className="flex">
        <div className="w-full"></div>
      </div>
      <span className="font-bold">Salas disponiveis: </span>
      <div>
        {salas.map((sala) => {
          count++;
          if (count === 5)
            return (
              <a
                className="ml-[35%] text-black bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
                href="/salas"
                key={sala.id}
              >
                Veja todas as salas
              </a>
            );

          if (count >= 6) return "";

          return (
            <div className="py-2" key={sala.id}>
              <Salas
                sala={sala}
                setSalaAtual={setSalaAtual}
                setShowModal={setShowModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SalasDisponiveis;
