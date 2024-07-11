"use client";

import { useState } from "react";

// ler todas as salas disponeis para a busca

function SearchBar() {
  const [search, setSearch] = useState<string>();
  return (
    <input
      className="w-full"
      type="text"
      placeholder="Digite o nome da sala"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
