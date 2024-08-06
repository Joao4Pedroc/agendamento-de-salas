"use client";

import { useEffect, useState } from "react";
import { getSalas } from "../_services/apiSalas";
import { Agendamento, Sala } from "../_components/types";
import Image from "next/image";
import useAdminId from "../_Helper/getAdminId";
import {
  confirmAgendamento,
  deleteAgendamentoPendente,
  getAgendamentoPendentes,
} from "../_services/apiAgendamento";
import reformatTime from "../_Helper/reformatTime";
import Modal from "../_components/Modal";

function Salas() {
  const [salas, setSalas] = useState<any>();
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [agendamentos, setAgendamentos] = useState<any>();

  const { admin, userId } = useAdminId();

  async function handleSubmit({ agendamento }: { agendamento: Agendamento }) {
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

  async function handleDelete({ agendamento }: { agendamento: Agendamento }) {
    if (agendamento.id) {
      const data = await deleteAgendamentoPendente(agendamento);
      if (data) {
        alert("Agendamento deletado");
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
    if (agendamentos.length === 0) {
      return (
        <div className="text-center text-3xl mt-[20%] font-bold">
          Não existem agendamentos pendentes!!
        </div>
      );
    }
    return (
      <div className="grid grid-cols-3 gap-12 mt-10 sm:grid-cols-1 md:grid-cols-3">
        {agendamentos?.map((agendamento: Agendamento) => {
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
                <button
                  onClick={() => setDeleteModal(!deleteModal)}
                  className="text-black  bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-700"
                >
                  DELETAR AGENDAMENTO
                </button>
                <Modal isVisible={deleteModal} setIsVisible={setDeleteModal}>
                  <div className="flex flex-col items-center ">
                    <div className="">
                      <div className="text-center text-3xl mb-4">
                        DELETAR AGENDAMENTO
                      </div>
                      <span>
                        deletar esse agendamento ira exclui-lo pernamentemente.
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete({ agendamento })}
                      className=" mt-20 text-black  bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-500 dark:hover:bg-red-600 focus:outline-none dark:focus:ring-red-700"
                    >
                      DELETAR AGENDAMENTO
                    </button>
                  </div>
                </Modal>
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
                    onClick={() => setConfirmModal(!confirmModal)}
                    className="text-black  bg-amber-400 hover:bg-amber-500 w-full focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
                  >
                    CONFIRMAR AGENDAMENTO
                  </button>
                  <Modal
                    isVisible={confirmModal}
                    setIsVisible={setConfirmModal}
                  >
                    <div className="flex flex-col items-center ">
                      <div className="">
                        <div className="text-center text-3xl mb-4">
                          CONFIRMAR AGENDAMENTO
                        </div>
                        <span>
                          confimar esse agendamento ira transforma-lo de um
                          agendamento pendente, para um agendamento confirmado.
                        </span>
                      </div>
                      <button
                        onClick={() => handleSubmit({ agendamento })}
                        className=" mt-20 text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
                      >
                        CONFIRMAR AGENDAMENTO
                      </button>
                    </div>
                  </Modal>
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
