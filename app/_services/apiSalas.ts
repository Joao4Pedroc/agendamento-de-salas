import { toast } from "react-toastify";
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
    toast.error("Não foi possivel carregar as salas, tente novamente.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    throw new Error("Não foi possivel carregar as salas.");
  }

  return salas;
}
