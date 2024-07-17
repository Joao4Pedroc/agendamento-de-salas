"use client";

import { useState } from "react";

// ler todas as salas disponeis para a busca

function SearchBar() {
  const [search, setSearch] = useState<string>();
  return (
    <div className="w-full mb-3">
      <input
        type="search"
        className="block w-full flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Procurar salas..."
      />
    </div>
  );
}

export default SearchBar;
