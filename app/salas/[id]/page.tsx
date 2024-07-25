"use client";

import Button from "@/app/_components/Button";
import ButtonBack from "@/app/_components/ButtonBack";
import Calendario from "@/app/_components/Calendario";
import DatePickerForm from "@/app/_components/DatePickerForm";
import Modal from "@/app/_components/Modal";
import { checkLoggedIn } from "@/app/_Helper/checkLoggedIn";
import { getSalasNomesId } from "@/app/_services/apiSalas";
import { getUserAdmin } from "@/app/_services/apiUser";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function SalaId() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sala, setSalas] = useState<any>();
  const idUrl = Number(usePathname().slice(7));

  const [admin, setAdmin] = useState();
  const [userId, setUserId] = useState<any>();

  useEffect(() => {
    async function checkUser() {
      try {
        const { id } = await checkLoggedIn();
        setUserId(id);
        if (!id) throw new Error("Não foi possivel carregar as informações");
      } catch (error) {
        console.error(error);
      }
    }

    checkUser();
  }, []);

  useEffect(() => {
    async function checkUserId() {
      try {
        const user = await getUserAdmin({ userId });
        setAdmin(user[0].admin);
        if (!user) throw new Error("Não foi possivel carregar as informações");
      } catch (error) {
        console.error(error);
      }
    }

    checkUserId();
  }, [userId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const salas = await getSalasNomesId();
        if (!salas) throw new Error("Não foi possivel carregar as informações");
        const sala = salas.filter((sala) => sala.id === idUrl);
        setSalas(sala);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [idUrl]);

  return (
    <div className="pt-2">
      <ButtonBack />
      <Calendario />
      <div className="pt-5 pl-[85%]">
        <Button onClick={setShowModal}>AGENDE UM HORARIO</Button>
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          <DatePickerForm sala={sala} admin={admin} />
        </Modal>
      </div>
    </div>
  );
}

export default SalaId;
