import Salas from "./Salas";

function SalasDisponiveis() {
  return (
    <div className="bg-yellow-400">
      <div className="flex">
        <div className="w-full">search bar</div>
        <div>config</div>
      </div>
      <div className="">
        <span>salas disponiveis</span>
        <Salas />
      </div>
    </div>
  );
}

export default SalasDisponiveis;
