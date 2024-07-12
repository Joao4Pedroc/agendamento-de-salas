"use client";

import SalasDisponiveis from "./_components/SalasDisponiveis";
import Image from "next/image";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Home() {
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
          <span className="text-sm">dia de hoje</span>
        </div>
      </div>
      <SalasDisponiveis />
      <Carousel
        showArrows
        autoPlay
        stopOnHover
        infiniteLoop
        centerMode
        className="w-[30rem]"
      >
        <div>
          <Image
            src="/logo_fepecs.png"
            width={500}
            height={500}
            alt="fepecs logo"
          />
          <p>Sala 1</p>
        </div>
        <div>
          <Image
            src="/logo_fepecs.png"
            width={500}
            height={500}
            alt="fepecs logo"
          />
          <p>Sala 2</p>
        </div>
        <div>
          <Image
            src="/logo_fepecs.png"
            width={500}
            height={500}
            alt="fepecs logo"
          />
          <p>Sala 3</p>
        </div>
      </Carousel>
      {/* <span className="bg-red-500">carousel</span> */}
    </div>
  );
}
