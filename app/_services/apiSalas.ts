import supabase from "./supabase";

export async function getSalas() {
  let { data, error } = await supabase.from("Salas").select("*");

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel carregar as salas.");
  }

  return data;
}

export async function getSalasNomesId() {
  let { data: salas, error } = await supabase.from("Salas").select("id,nome");

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel carregar as salas.");
  }

  return salas;
}
