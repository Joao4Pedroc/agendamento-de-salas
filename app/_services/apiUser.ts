import { toast } from "react-toastify";
import supabase from "./supabase";

export async function getUserAdmin({ userId }: any) {
  let { data: allUser, error } = await supabase
    .from("Usuários")
    .select("id,admin,nome");

  if (error) {
    console.error(error.message);
    toast.error("Ocorreu um erro carregando seu usuario, tente novamente.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    throw new Error(error.message);
  }

  if (!userId) return "";
  const user = allUser?.filter((user) => user.id === userId);

  return user;
}
