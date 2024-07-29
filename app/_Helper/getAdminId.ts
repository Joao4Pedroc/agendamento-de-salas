import { useEffect, useState } from "react";
import { checkLoggedIn } from "./checkLoggedIn";
import { getUserAdmin } from "../_services/apiUser";

export default function useAdminId() {
  const [admin, setAdmin] = useState<boolean | undefined>();
  const [userId, setUserId] = useState<string | undefined | null>();
  const [nome, setNome] = useState<string>();

  useEffect(() => {
    async function checkUser() {
      try {
        const { id } = await checkLoggedIn();
        setUserId(id);
        if (!id) throw new Error("Não foi possivel carregar as informações");
      } catch (error) {
        console.error(error);
      }
    }

    checkUser();
  }, []);

  useEffect(() => {
    async function checkUserId() {
      try {
        const user: any = await getUserAdmin({ userId });
        if (user[0].admin) {
          setAdmin(true);
        }
        setNome(user[0].nome);
        if (!user) throw new Error("Não foi possivel carregar as informações");
      } catch (error) {
        console.error(error);
      }
    }

    checkUserId();
  }, [userId]);

  return { admin, userId, nome };
}
