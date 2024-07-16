"use client";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/pt-br";
import moment from "moment";
import { useEffect, useState } from "react";
import { Agendamento } from "@/app/_components/types";
import getAgendamento from "@/app/_services/apiAgendamento";

interface Event {
  id: number;
  start: Date;
  end: Date;
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

function SalaId() {
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAgendamento();
        if (!data) throw new Error("Não foi possivel carregar as informações");
        const transformedData: Event[] = data.map(
          (agendamento: Agendamento) => ({
            id: agendamento.id,
            start: moment(agendamento.horarioEntrada).toDate(),
            end: moment(agendamento.horarioSaida).toDate(),
            title: `Sala ${agendamento.id}`,
          })
        );
        setEvents(transformedData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // evento que serao pegos da database

  return (
    <div className="h-full">
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
        style={{ height: "80vh" }}
      />
    </div>
  );
}

export default SalaId;
