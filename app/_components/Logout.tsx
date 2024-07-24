import { logout } from "../_services/apiAuth";

export default function Logout() {
  return (
    <button onClick={logout} className="pr-5 font-bold">
      Logout
    </button>
  );
}
