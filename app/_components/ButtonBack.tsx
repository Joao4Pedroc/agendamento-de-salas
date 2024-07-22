import { useRouter } from "next/navigation";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";

function ButtonBack() {
  const route = useRouter();

  return (
    <button className="mb-2 text-3xl " onClick={() => route.back()}>
      <HiOutlineArrowLeftCircle />
    </button>
  );
}

export default ButtonBack;
