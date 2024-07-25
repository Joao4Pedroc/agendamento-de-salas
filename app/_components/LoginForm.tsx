"use client";

import { FormEvent, useEffect, useState } from "react";
import { login } from "../_services/apiAuth";
import { navigate } from "../_Helper/navigate";
import { checkLoggedIn } from "../_Helper/checkLoggedIn";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState<string | null>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      alert("Login ou senha vazios");
      return;
    }

    const data = await login({ email, password });
    if (data) {
      navigate();
    }
  }

  useEffect(() => {
    async function checkUser() {
      try {
        const { id, isLoading } = await checkLoggedIn();
        console.log(id);
        if (!id) throw new Error("Não foi possivel carregar as informações");
        if (!id) navigate();
      } catch (error) {
        console.error(error);
      }
    }

    checkUser();
  }, [isLogged]);

  return (
    <form className="max-w-sm mx-auto mt-[10%]">
      <p className="text-center mb-10 font-bold text-3xl">Entre na sua conta</p>
      <div className="border-solid border-gray-400 border-2 p-4 rounded-xl mt-8">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seu email
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Sua senha
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
        >
          Entre na sua conta
        </button>
        <p className="text-sm">
          ou registre uma{" "}
          <a href="/signup" className="text-blue-600">
            nova conta
          </a>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
