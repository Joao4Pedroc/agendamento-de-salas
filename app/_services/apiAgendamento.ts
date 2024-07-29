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
  idUsuario,
  titulo,
  admin,
  username,
  atividade,
}: {
  dia: string;
  horarioEntrada: string;
  horarioSaida: string;
  idSala: number;
  idUsuario: string;
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
