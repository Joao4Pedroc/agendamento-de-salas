import supabase from "./supabase";

export async function getUserAdmin({ userId }: any) {
  let { data: allUser, error } = await supabase
    .from("Usuários")
    .select("id,admin,nome");

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel carregar as salas.");
  }

  if (!userId) return "";
  const user = allUser?.filter((user) => user.id === userId);

  return user;
}
