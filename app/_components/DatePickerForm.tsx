"use client";

import { ptBR } from "date-fns/locale";
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatDateTime from "../_Helper/formatTime";
import { sendAgendamento } from "../_services/apiAgendamento";
import { usePathname } from "next/navigation";
import { Sala } from "./types";

registerLocale("ptBR", ptBR);

function DatePickerForm({
  sala,
  admin,
  idUsuario,
  nome,
}: {
  sala: Sala[];
  admin: boolean | any;
  idUsuario: string | undefined | null;
  nome: string | undefined;
}) {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [userName, setUserName] = useState<string>();
  const [atividade, setAtividade] = useState<string>("");

  const idSala = Number(usePathname().slice(7));
  const titulo = `Sala ${idSala} agenda-da por usuario ${idUsuario}`;

  //dateform fix username when logged

  const username = nome ? nome : userName;

  const handleSubmit = () => {
    if (date && startTime && endTime && username && atividade) {
      const {
        formattedDay: dia,
        startDateTime: horarioEntrada,
        endDateTime: horarioSaida,
      } = formatDateTime(date, startTime, endTime);
      sendAgendamento({
        dia,
        horarioEntrada,
        horarioSaida,
        idSala,
        titulo,
        admin,
        username,
        atividade,
      });

      if (admin) alert("Horario agendado.");
      else
        alert(
          "Horario pendente para agendamento, espere algum admin aprovar o agendamento"
        );
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <form className="max-w-sm mx-auto flex flex-col items-center">
      <p className="text-xl font-semibold mb-10">Agendar {`${sala[0].nome}`}</p>
      <div className="grid grid-cols-2 gap-12">
        <div>
          <div className="self-start">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Dia do agendamento
              </label>
              <DatePicker
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                locale={"ptBR"}
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yy"
                placeholderText="Dia"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Horario de entrada
              </label>
              <DatePicker
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                selected={startTime}
                onChange={(time) => setStartTime(time)}
                locale="ptBR"
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="p"
                placeholderText="Horario de entrada"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Horario de saída
              </label>
              <DatePicker
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                locale="ptBR"
                showTimeSelect
                showTimeSelectOnly
                timeFormat="p"
                timeIntervals={30}
                placeholderText="Horario de saída"
                dateFormat="p"
                required
              />
            </div>
          </div>
        </div>
        <div>
          {idUsuario ? (
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Seu nome:
              </label>
              <input
                value={nome}
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            </div>
          ) : (
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Seu nome:
              </label>
              <input
                onChange={(name) => setUserName(name.target.value)}
                value={userName}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            </div>
          )}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Atividade:
            </label>
            <input
              onChange={(atividade) => setAtividade(atividade.target.value)}
              value={atividade}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="my-5 text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
      >
        Agendar
      </button>
    </form>
  );
}

export default DatePickerForm;
