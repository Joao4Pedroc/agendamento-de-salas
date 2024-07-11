import Salas from "./Salas";
import SearchBar from "./SearchBar";

function SalasDisponiveis() {
  return (
    <div className="bg-yellow-400">
      <div className="flex">
        <SearchBar />
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
