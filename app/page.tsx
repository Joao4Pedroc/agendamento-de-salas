"use client";

import SalasDisponiveis from "./_components/SalasDisponiveis";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselSalas from "./_components/CarouselSalas";
import Modal from "./_components/Modal";
import { useState } from "react";
import { Sala } from "./_components/types";
import Image from "next/image";
import ButtonLink from "./_components/ButtonLink";
import Link from "next/link";

export default function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [salaAtual, setSalaAtual] = useState<Sala>();

  const date = new Date();
  let dia = date.getDate();
  let mes = date.getMonth() + 1;
  let ano = date.getFullYear();

  return (
    <div className="grid grid-cols-2 my-20 gap-20 items-start ">
      <div className=" text-center">
        <div className="text-5xl text-[#000068] uppercase">
          Agendamento de salas
        </div>
        <div className="mb-20">
          <span className="text-black text-[1rem] font-semibold ">
            Sejam bem-vindos ao site de agendamento de salas. Aqui você pode ver
            <br />a disponibilidade das salas e auditório da FEPECS.
          </span>
          <br />
          <span className="text-sm">{`${dia}/${mes}/${ano}`}</span>
          <div className="w-full mx-[15%] mt-5 ">
            <CarouselSalas
              setIsVisible={setShowModal}
              isVisible={showModal}
              salas={salas}
              setSalas={setSalas}
              setSalaAtual={setSalaAtual}
            />
          </div>
        </div>
        {salaAtual ? (
          <Modal isVisible={showModal} setIsVisible={setShowModal}>
            <div className="font-bold mb-8">Sala {salaAtual?.nome}</div>
            <div className="flex gap-12 p-12  items-center ">
              <Image
                className="rounded-md"
                src={salaAtual.imagem}
                width={300}
                height={300}
                alt={`sala ${salaAtual?.nome}`}
              />
              <ul className="grid content-center items-center text-xl font-medium list-disc ">
                <li>Capacidade: {salaAtual.capacidade} pessoas</li>
                <li className="place-self-start pl-1">
                  {salaAtual.televisão ? "Televisão" : "Não possui televisão"}
                </li>
                <li className="place-self-start pl-1">
                  {salaAtual.internet ? "Internet" : "Não possui internet"}
                </li>
                <li className="place-self-start pl-1">
                  {salaAtual.descrição
                    ? salaAtual.descrição
                    : "Não possui descrição"}
                </li>
                <li className="list-none mt-10">
                  <Link
                    className="text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700 block "
                    href={`/salas/${salaAtual?.id}`}
                  >
                    Visualizar disponibilidade
                  </Link>
                </li>
              </ul>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </div>
      <div className="">
        <SalasDisponiveis
          setSalaAtual={setSalaAtual}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
}
