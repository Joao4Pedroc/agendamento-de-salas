import { logout } from "../_services/apiAuth";

export default function Logout() {
  return (
    <button onClick={logout} className="text-md ">
      Logout
    </button>
  );
}
