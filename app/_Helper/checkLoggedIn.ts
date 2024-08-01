import { toast } from "react-toastify";
import supabase from "../_services/supabase";

export const checkLoggedIn = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error("Não foi possivel reconhecer seu login");
    const id = data.session?.user.id;

    return {
      id,
      isLoading: false,
    };
  } catch (error) {
    toast.error("Não foi possivel reconhecer seu login, tente novamente.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.error("Error checking user login status:", error);
    return {
      id: null,
      isLoading: false,
    };
  }
};
