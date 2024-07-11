import SalasDisponiveis from "./_components/SalasDisponiveis";

export default function Home() {
  return (
    <div className="grid grid-cols-2 my-20 gap-20">
      <div className="bg-blue-500">
        <div className="text-5xl text-[#000068] uppercase">
          Agendamento de salas
        </div>
        <div className="mb-20">
          <span className="text-black ">
            Sejam bem-vindos ao site de agendamento de salas. Aqui você pode ver
            a disponibilidade das salas e auditório da FEPECS.
          </span>
          <br />
          <span className="text-sm">dia de hoje</span>
        </div>
      </div>
      <SalasDisponiveis />
      <span className="bg-red-500">carousel</span>
    </div>
  );
}
