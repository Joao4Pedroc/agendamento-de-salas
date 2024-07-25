import supabase from "../_services/supabase";

export const checkLoggedIn = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    const id = data.session?.user.id;

    return {
      id,
      isLoading: false,
    };
  } catch (error) {
    console.error("Error checking user login status:", error);
    return {
      id: null,
      isLoading: false,
    };
  }
};
