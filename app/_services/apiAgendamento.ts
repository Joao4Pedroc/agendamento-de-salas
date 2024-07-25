import { Agendamento } from "../_components/types";
import supabase from "./supabase";

export async function getAgendamento() {
  let { data, error } = await supabase.from("Agendamento").select("*");

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel carregar os agendamentos.");
  }

  return data;
}

export async function sendAgendamento({
  dia,
  horarioEntrada,
  horarioSaida,
  idSala,
  idUsuario,
  titulo,
  admin,
}: {
  dia: string;
  horarioEntrada: string;
  horarioSaida: string;
  idSala: number;
  idUsuario: string;
  titulo: string;
  admin: boolean;
}) {
  const agendamento = admin ? "Agendamento" : "Agendamento_pendente";
  console.log("agendamento", admin, agendamento);

  const { data, error } = await supabase
    .from(agendamento)
    .insert([
      {
        dia: dia,
        horarioEntrada: horarioEntrada,
        horarioSaida: horarioSaida,
        idSala: idSala,
        idUsuario: idUsuario,
        titulo: titulo,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel concluir o agendamento.");
  }

  return data;
}
