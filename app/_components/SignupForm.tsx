"use client";

import { FormEvent, useEffect, useState } from "react";
import { navigate } from "../_Helper/navigate";
import { signUp } from "../_services/apiAuth";
import { checkLoggedIn } from "../_Helper/checkLoggedIn";

function SignupForm() {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordTwo, setPasswordTwo] = useState<string>("");
  const [isLogged, setIsLogged] = useState();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      alert("Login ou senha vazios");
      return;
    }
    if (password !== passwordTwo) {
      alert("As senhas devem ser iguais.");
      return;
    }

    const data = await signUp({ email, password });
    if (data) navigate();
  }

  useEffect(() => {
    async function checkUser() {
      try {
        const { token, isLoading } = await checkLoggedIn();
        setIsLogged(token);
        if (!token) throw new Error("Não foi possivel carregar as informações");
        if (token) navigate();
      } catch (error) {
        console.error(error);
      }
    }

    checkUser();
  }, [isLogged]);

  return (
    <form className="max-w-sm mx-auto mt-[10%]">
      <p className="text-center mb-10 font-bold text-3xl">
        Crie uma nova conta
      </p>
      <div className="border-solid border-gray-400 border-2 p-4 rounded-xl mt-8">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Seu nome
          </label>
          <input
            type="nome"
            id="nome"
            onChange={(e) => setNome(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
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
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Repita sua senha
          </label>
          <input
            type="password"
            id="repeat-password"
            onChange={(e) => setPasswordTwo(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
        >
          Crie uma nova conta
        </button>
        <p className="text-sm">
          ou entre na{" "}
          <a href="/login" className="text-blue-600">
            sua conta
          </a>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
