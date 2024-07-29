"use client";

import { useEffect, useState } from "react";
import { getSalas } from "../_services/apiSalas";
import { Agendamento, Sala } from "../_components/types";
import Image from "next/image";
import useAdminId from "../_Helper/getAdminId";
import {
  confirmAgendamento,
  getAgendamentoPendentes,
} from "../_services/apiAgendamento";
import reformatTime from "../_Helper/reformatTime";

function Salas() {
  const [salas, setSalas] = useState<any>();
  const [agendamentos, setAgendamentos] = useState<any>();

  const { admin, userId } = useAdminId();

  async function handleSubmit({ agendamento }: { agendamento: Agendamento }) {
    console.log(
      agendamento.dia,
      agendamento.horarioEntrada,
      agendamento.horarioSaida,
      agendamento.atividade,
      agendamento.idSala
    );
    if (
      agendamento.dia &&
      agendamento.horarioEntrada &&
      agendamento.horarioSaida &&
      agendamento.atividade &&
      agendamento.idSala
    ) {
      const data = await confirmAgendamento(agendamento);
      if (data) {
        alert("Agendamento confirmado");
        location.reload();
      }
    } else alert("Agendamento incompleto");
  }

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
                  height={300}
                  width={300}
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
                <li>
                  <button
                    onClick={() => handleSubmit({ agendamento })}
                    className="text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
                  >
                    CONFIRMAR AGENDAMENTO
                  </button>
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
        <a href="/login" className="text-blue-900 hover:text-blue-600">
          {" "}
          Faça seu login.
        </a>
      </div>
    );
}

export default Salas;
