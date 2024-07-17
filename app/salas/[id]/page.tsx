"use client";

import Button from "@/app/_components/Button";
import Calendario from "@/app/_components/Calendario";

function SalaId() {
  return (
    <div className="pt-2">
      <Calendario />
      <div className="pt-5 pl-[85%]">
        <Button>AGENDE UM HORARIO</Button>
      </div>
    </div>
  );
}

export default SalaId;
