import getSalas from "../_services/apiSalas";

import { useEffect, useState } from "react";
import { Sala } from "./types";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { HiMiniArrowLeftCircle, HiMiniArrowRightCircle } from "react-icons/hi2";

export default function CarouselSalas({
  isVisible,
  setIsVisible,
  salas,
  setSalas,
  setSalaAtual,
}: {
  isVisible: boolean;
  setIsVisible: Function;
  salas: Sala[];
  setSalas: Function;
  setSalaAtual: Function;
}) {
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
  }, [setSalas]);

  // quando clicar numa imagem do carousel, ira abrir um modal, no modal tera um botao de visualizar disponibilidade
  return (
    <Carousel
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute z-10 top-[calc(50%-10%)] w-8 h-8 cursor-pointer left-2 text-4xl"
          >
            <HiMiniArrowLeftCircle className="fill-amber-400 hover:fill-amber-600 " />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute z-10 top-[calc(50%-10%)] w-8 h-8 cursor-pointer right-2 text-4xl "
          >
            <HiMiniArrowRightCircle className="fill-amber-400 hover:fill-amber-600" />
          </button>
        )
      }
      showArrows={!isVisible}
      autoPlay
      stopOnHover
      infiniteLoop
      showThumbs={false}
      showIndicators={!isVisible}
      className="w-[70%]"
    >
      {salas.map((sala: Sala) => (
        <button
          key={sala.id}
          onClick={() => {
            setIsVisible(!isVisible);
            setSalaAtual(sala);
          }}
        >
          <Image
            className="rounded-md"
            src={`${sala.imagem}`}
            width={500}
            height={500}
            alt={`sala ${sala.id}`}
          />
          <p className="my-8 font-medium">{`Sala ${sala.nome}`}</p>
        </button>
      ))}
    </Carousel>
  );
}
