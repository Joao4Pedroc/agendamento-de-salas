import { useState } from "react";
import LoginForm from "../_components/LoginForm";
import { checkLoggedIn } from "../_Helper/checkLoggedIn";
import { navigate } from "../_Helper/navigate";

export default async function login() {
  const { token } = await checkLoggedIn();

  if (token) navigate();
  return (
    <div>
      <LoginForm />
    </div>
  );
}
