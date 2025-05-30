import { AiOutlineLoading } from "react-icons/ai";

export default function NovelLoading() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <AiOutlineLoading className="animate-spin" size={40} />
    </div>
  );
}
