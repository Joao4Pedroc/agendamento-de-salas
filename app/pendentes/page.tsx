"use client";

import { useEffect, useState } from "react";
import { getSalas } from "../_services/apiSalas";
import { Sala } from "../_components/types";
import Image from "next/image";
import useAdminId from "../_Helper/getAdminId";
import { getAgendamentoPendentes } from "../_services/apiAgendamento";
import reformatTime from "../_Helper/reformatTime";

function Salas() {
  const [salas, setSalas] = useState<any>();
  const [agendamentos, setAgendamentos] = useState<any>();

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

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAgendamentoPendentes();
        if (!data) throw new Error("Não foi possivel carregar as informações");
        setAgendamentos(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  if (admin) {
    return (
      <div className="grid grid-cols-3 gap-12 mt-10">
        {agendamentos?.map((agendamento) => {
          const sala = salas.filter((sala) => sala.id === agendamento.idSala);

          return (
            <ul className="font-medium flex gap-4 " key={agendamento.id}>
              <li className="">
                <Image
                  className="rounded-lg"
                  src={sala[0].imagem}
                  height={250}
                  width={250}
                  alt={`Imagem da sala ${sala[0].nome}`}
                />
              </li>
              <div>
                <li>Sala {sala[0].nome}</li>

                <li className="">
                  Horario entrada: {reformatTime(agendamento.horarioEntrada)}
                </li>
                <li>
                  Horario entrada: {reformatTime(agendamento.horarioSaida)}
                </li>
                <li>Agenda-da por: {agendamento.nomeUsuario}</li>
                <li className="text-blue-900 ">
                  <a href={`/salas/${sala[0].id}`}>Ver calendario da sala</a>
                </li>
              </div>
            </ul>
          );
        })}
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
