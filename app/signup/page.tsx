import SignupForm from "../_components/SignupForm";
import { checkLoggedIn } from "../_Helper/checkLoggedIn";
import { navigate } from "../_Helper/navigate";

export default async function sigup() {
  const { token }: any = await checkLoggedIn();

  if (token) navigate();
  return (
    <div>
      <SignupForm />
    </div>
  );
}
