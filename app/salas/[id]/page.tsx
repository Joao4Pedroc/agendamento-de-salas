"use client";

import Button from "@/app/_components/Button";
import ButtonBack from "@/app/_components/ButtonBack";
import Calendario from "@/app/_components/Calendario";
import DatePickerForm from "@/app/_components/DatePickerForm";
import Modal from "@/app/_components/Modal";
import { useState } from "react";

function SalaId() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="pt-2">
      <ButtonBack />
      <Calendario />
      <div className="pt-5 pl-[85%]">
        <Button onClick={setShowModal}>AGENDE UM HORARIO</Button>
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          <DatePickerForm />
        </Modal>
      </div>
    </div>
  );
}

export default SalaId;
