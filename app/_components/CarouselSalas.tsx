import getSalas from "../_services/apiSalas";

import { useEffect, useState } from "react";
import { Sala } from "./types";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

export default function CarouselSalas() {
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
    <Carousel
      showArrows
      autoPlay
      stopOnHover
      infiniteLoop
      centerMode
      showThumbs={false}
      className="w-[70%]"
    >
      {salas.map((sala) => (
        <div key={sala.id}>
          <Image
            src={`${sala.imagem}`}
            width={500}
            height={500}
            alt={`sala ${sala.id}`}
          />
          <p className="my-8">{`Sala ${sala.nome}`}</p>
        </div>
      ))}
    </Carousel>
  );
}
