import { HiMiniXCircle } from "react-icons/hi2";

export default function Modal({
  isVisible,
  setIsVisible,
  children,
}: {
  isVisible: boolean;
  setIsVisible: Function;
  children: any;
}) {
  if (!isVisible) return null;

  function handleClose(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (target.id === "wrapper") {
      setIsVisible(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="min-w-[700px] min-h-[400px] bg-white p-2 rounded">
        <button
          onClick={() => setIsVisible(false)}
          className="text-black text-4xl flex ml-[95%]"
        >
          <HiMiniXCircle />
        </button>
        {children}
      </div>
    </div>
  );
}
