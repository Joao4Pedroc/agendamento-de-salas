"use client";

import { useEffect, useState } from "react";
import { getSalas } from "../_services/apiSalas";
import { Agendamento, Sala } from "../_components/types";
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
      <div className="grid grid-cols-3 gap-12 mt-10 sm:grid-cols-1 md:grid-cols-3">
        {agendamentos?.map((agendamento: Agendamento) => {
          console.log(agendamento);
          const sala = salas.filter(
            (sala: Sala) => sala.id === agendamento.idSala
          );

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
                <li>
                  Sala <span className="font-bold">{sala[0].nome}</span>
                </li>

                <li className="">
                  Horario entrada:
                  <span className="font-bold">
                    {` ${reformatTime(agendamento.horarioEntrada)}`}
                  </span>
                </li>
                <li>
                  Horario saida:
                  <span className="font-bold">
                    {` ${reformatTime(agendamento.horarioSaida)}`}
                  </span>
                </li>
                <li>
                  Atividade:
                  <span className="font-bold">{` ${agendamento.atividade}`}</span>
                </li>
                <li>
                  Agenda-da por:
                  <span className="font-bold">{` ${agendamento.nomeUsuario}`}</span>
                </li>
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
