import supabase from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    throw new Error(error.message);
  }

  window.location.reload();
  return data;
}

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  // criacão do usuario
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    throw new Error(error.message);
  }

  // colocando o usuario na database usuarios
  const { data, error: insertError } = await supabase
    .from("Usuários")
    .insert([{ id: user.user?.id, admin: false }])
    .select();

  // checando se ocorreu um erro, talvez ocorra um problema se criar o usuario na sessão Auth e nao criar na sessão Usuarios
  if (insertError) {
    alert(insertError.message);
    throw new Error(insertError.message);
  }

  window.location.reload();
  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    alert(error.message);
    throw new Error(error.message);
  }

  window.location.reload();
  return true;
}
