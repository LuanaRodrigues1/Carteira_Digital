import { FaArrowCircleDown, FaArrowCircleUp, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

interface PropsCard {
  id: number;
  name: string;
  value: number;
  date: string;
  sector: string;
  status: boolean;
  onDelete: (id: number) => void;
  onUpdate: (id: number, status: boolean) => void;
}

export default function Card({
  id,
  name,
  value,
  date,
  status,
  onDelete,
  onUpdate,
}: PropsCard) {
  async function deleteCard() {
    try {
      onDelete(id);
    } catch (error) {
      console.error("Erro ao excluir o card:", error);
    }
  }

  async function UpdateCard() {
    try {
      onUpdate(id, status);
    } catch (error) {
      console.error("Erro ao atualizar o card:", error);
    }
  }

  return (
    <>
      <td className="border p-2 border-slate-700 text-center">{name}</td>
      <td className="border p-2 border-slate-700 text-center bg-slate-200">
        {value}
      </td>
      <td className="border border-slate-700 p-2 text-center">{date}</td>
      <td className="border border-slate-700 p-2 bg-slate-200">
        {status ? (
          <div className="flex justify-center">
            <FaArrowCircleUp className="text-green-600 w-6 h-6 bg-slate-200" />
          </div>
        ) : (
          <div className="flex justify-center">
            <FaArrowCircleDown className="text-red-600 w-6 h-6 bg-slate-200" />
          </div>
        )}
      </td>
      <td className="border border-slate-700 p-2">
        <div className="flex justify-center">
          <button onClick={UpdateCard}>
            <FaPenToSquare className="w-6 h-6 mr-4" />
          </button>
          <button onClick={deleteCard}>
            <FaTrash className="w-6 h-6" />
          </button>
        </div>
      </td>
    </>
  );
}
