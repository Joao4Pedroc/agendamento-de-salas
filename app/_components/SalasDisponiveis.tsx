"use client";

import { useEffect, useState } from "react";
import Salas from "./Salas";
import SearchBar from "./SearchBar";
import getSalas from "../_services/apiSalas";
import { Sala } from "./types";
import { HiCog8Tooth } from "react-icons/hi2";

function SalasDisponiveis() {
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
    <div className="bg-red-400">
      <div className="flex">
        <SearchBar />
        <button className="px-2 py-3 text-[1.2rem]">
          <HiCog8Tooth />
        </button>
      </div>
      <span>salas disponiveis</span>
      <div className="">
        {salas.map((sala) => (
          <Salas key={sala.id} sala={sala} />
        ))}
      </div>
    </div>
  );
}

export default SalasDisponiveis;
