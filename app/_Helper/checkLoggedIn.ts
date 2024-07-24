import supabase from "../_services/supabase";

export const checkLoggedIn = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    const token = data.session?.access_token;

    return {
      token,
      isLoading: false,
    };
  } catch (error) {
    console.error("Error checking user login status:", error);
    return {
      token: null,
      isLoading: false,
    };
  }
};
