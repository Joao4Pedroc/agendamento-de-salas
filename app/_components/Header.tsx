import Image from "next/image";
import { HiMiniUser } from "react-icons/hi2";

function Header() {
  return (
    <header className="flex justify-between">
      <Image
        src="/logo_fepecs.png"
        width={100}
        height={100}
        alt="fepecs logo"
      />
      <div className="pr-10 flex mt-5 gap-5">
        <span className="pr-5 font-bold">login</span>
        <HiMiniUser className="w-7 h-7" />
      </div>
    </header>
  );
}

export default Header;
