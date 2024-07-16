import supabase from "./supabase";

export default async function getAgendamento() {
  let { data, error } = await supabase.from("Agendamento").select("*");

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel carregar os agendamentos.");
  }

  return data;
}
