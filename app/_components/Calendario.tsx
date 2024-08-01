"use client";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/pt-br";
import moment from "moment";
import { useEffect, useState } from "react";
import { Agendamento, Sala } from "@/app/_components/types";
import { getAgendamento } from "../_services/apiAgendamento";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

interface Event {
  id: number;
  start: Date | string;
  end: Date | string;
  idSalaAgenda: number;
  idUsuarioAgenda: number;
  title: string;
}

const localizer = momentLocalizer(moment);

// Mudar a lingua das mensagens do calendario
const messages = {
  allDay: "Dia Inteiro",
  previous: "<",
  next: ">",
  today: "Hoje",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  showMore: (total: Number) => `+ (${total}) Eventos`,
};

function Calendario() {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const [events, setEvents] = useState<Event[]>([]);

  const idUrl = Number(usePathname().slice(7));

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAgendamento();
        if (!data) throw new Error("Não foi possivel carregar as informações");
        const transformedData: any[] = data.map((agendamento: Agendamento) => ({
          id: agendamento.id,
          idSalaAgenda: agendamento.idSala,
          idUsuarioAgenda: agendamento.idUsuario,
          start: moment(agendamento.horarioEntrada).toDate(),
          end: moment(agendamento.horarioSaida).toDate(),
          title: `Sala ${agendamento.idSala}`,
        }));

        setEvents(
          transformedData.filter((sala) => sala.idSalaAgenda === idUrl)
        );
      } catch (error) {
        toast.error("Ocorreu um erro", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error(error);
      }
    }

    fetchData();
  }, [idUrl]);

  // evento que serao pegos da database
  // filtrar os eventos apenas para o idSala

  return (
    <Calendar
      messages={messages}
      culture="pt-BR"
      localizer={localizer}
      events={events}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={view}
      view={view} // Include the view prop
      date={date} // Include the date prop
      onView={(view: any) => setView(view)}
      onNavigate={(date) => {
        setDate(new Date(date));
      }}
      style={{ height: "75vh" }}
    />
  );
}

export default Calendario;
