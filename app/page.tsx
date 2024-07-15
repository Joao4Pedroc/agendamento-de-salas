"use client";

import SalasDisponiveis from "./_components/SalasDisponiveis";
import Image from "next/image";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CarouselSalas from "./_components/CarouselSalas";

export default function Home() {
  const date = new Date();
  let dia = date.getDate();
  let mes = date.getMonth() + 1;
  let ano = date.getFullYear();

  return (
    <div className="grid grid-cols-2 my-20 gap-20">
      <div className="bg-blue-500">
        <div className="text-5xl text-[#000068] uppercase">
          Agendamento de salas
        </div>
        <div className="mb-20">
          <span className="text-black ">
            Sejam bem-vindos ao site de agendamento de salas. Aqui você pode ver
            a disponibilidade das salas e auditório da FEPECS.
          </span>
          <br />
          <span className="text-sm">{`${dia}/${mes}/${ano}`}</span>
        </div>
      </div>
      <SalasDisponiveis />
      <CarouselSalas />
    </div>
  );
}
