function Button({
  children,
  onClick,
}: {
  children: string;
  onClick: Function;
}) {
  return (
    <button
      onClick={() => onClick(true)}
      className="text-black  bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-5 dark:bg-amber-500 dark:hover:bg-amber-600 focus:outline-none dark:focus:ring-amber-700"
    >
      {children}
    </button>
  );
}

export default Button;
