"use client";

import { useEffect, useState } from "react";
import { getSalas } from "../_services/apiSalas";
import { Sala } from "../_components/types";
import Image from "next/image";
import useAdminId from "../_Helper/getAdminId";

function Salas() {
  const [salas, setSalas] = useState<Sala[]>();

  const { admin, userId } = useAdminId();

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

  if (admin) {
    return (
      <div className="grid grid-cols-3 gap-12 mt-10">
        {salas?.map((sala) => (
          <ul className="font-medium flex gap-4 " key={sala.id}>
            <li className="">
              <Image
                className="rounded-lg"
                src={sala.imagem}
                height={250}
                width={250}
                alt={`Imagem da sala ${sala.nome}`}
              />
            </li>
            <div>
              <li>Sala {sala.nome}</li>

              <li className="">Capacidade: {sala.capacidade} pessoas</li>
              <li>{sala.televisão ? "Televisão" : "Não possui televisão"}</li>
              <li>{sala.internet ? "Internet" : "Não possui internet"}</li>
              <li className="text-blue-900 ">
                <a href={`/salas/${sala.id}`}>Ver calendario da sala</a>
              </li>
            </div>
          </ul>
        ))}
      </div>
    );
  } else
    return (
      <div>
        Você precisa ser um admin para ver essa pagina.
        <a href="/login">Faça seu login.</a>
      </div>
    );
}

export default Salas;
