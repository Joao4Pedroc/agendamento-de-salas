import supabase from "./supabase";

export async function getUserAdmin({ userId }: any) {
  let { data: allUser, error } = await supabase
    .from("Usuários")
    .select("id,admin");

  if (error) {
    console.error(error);
    throw new Error("Não foi possivel carregar as salas.");
  }

  const user = allUser?.filter((user) => user.id === userId);
  console.log("here", user);

  return user;
}
