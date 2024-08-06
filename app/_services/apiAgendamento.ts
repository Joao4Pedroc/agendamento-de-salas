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

export async function getAgendamentoPendentes() {
  let { data, error } = await supabase.from("Agendamento_pendente").select("*");

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
  titulo,
  admin,
  username,
  atividade,
}: {
  dia: string;
  horarioEntrada: string;
  horarioSaida: string;
  idSala: number;
  titulo: string;
  admin: boolean;
  username: string;
  atividade: string;
}) {
  const agendamento = admin ? "Agendamento" : "Agendamento_pendente";

  const { data, error } = await supabase
    .from(agendamento)
    .insert([
      {
        dia: dia,
        horarioEntrada: horarioEntrada,
        horarioSaida: horarioSaida,
        idSala: idSala,
        titulo: titulo,
        nomeUsuario: username,
        atividade: atividade,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel concluir o agendamento.");
  }

  return data;
}

export async function deleteAgendamentoPendente(agendamento: Agendamento) {
  // se o agendamento.id for igual ao id, vai deletar o agendamento
  const { data, error } = await supabase
    .from("Agendamento_pendente")
    .delete()
    .eq("id", agendamento.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel concluir o agendamento.");
  }
  console.log(data);
}

export async function confirmAgendamento(agendamentoPendente: Agendamento) {
  const { data, error } = await supabase
    .from("Agendamento")
    .insert([
      {
        dia: agendamentoPendente.dia,
        horarioEntrada: agendamentoPendente.horarioEntrada,
        horarioSaida: agendamentoPendente.horarioSaida,
        idSala: agendamentoPendente.idSala,
        titulo: agendamentoPendente.titulo,
        nomeUsuario: agendamentoPendente.nomeUsuario,
        atividade: agendamentoPendente.atividade,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel concluir o agendamento.");
  }

  deleteAgendamentoPendente(agendamentoPendente);

  return data;
}
