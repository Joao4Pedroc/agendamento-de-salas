function Salas() {
  return (
    <div className="grid grid-cols-3">
      <span className="">imagem da sala</span>
      <div>
        <span>nome</span>
        <ul>
          <li>capacidade</li>
          <li>televisao</li>
          <li>internet</li>
        </ul>
      </div>
      <span>Visualizar disponibilidade</span>
    </div>
  );
}

export default Salas;
