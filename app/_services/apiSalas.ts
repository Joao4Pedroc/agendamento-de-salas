import supabase from "./supabase";

export default async function getSalas() {
  let { data, error } = await supabase.from("Salas").select("*");

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel carregar as salas.");
  }

  return data;
}
