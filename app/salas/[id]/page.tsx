import Button from "@/app/_components/Button";
import Calendario from "@/app/_components/Calendario";

export const metadata = {
  title: "Calendário",
};

function SalaId() {
  return (
    <div className="pt-2">
      <Calendario />
      <div className="pt-5 pl-[85%]">
        <Button>AGENDE UM HORARIO</Button>
      </div>
    </div>
  );
}

export default SalaId;
