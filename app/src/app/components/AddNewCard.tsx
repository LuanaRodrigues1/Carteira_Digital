import { api } from "@/services/api";
import { useState } from "react";

interface PropsAddNewCard {
  sectores: string[];
  onAddCard: () => void;
}

export default function AddNewCard({ sectores, onAddCard }: PropsAddNewCard) {
  const [newCardName, setNewCardName] = useState("");
  const [newCardValue, setNewCardValue] = useState(0);
  const [newCardSector, setNewCardSector] = useState("alimentacao");
  const [transactionType, setTransactionType] = useState("true");

  async function handleAddCard() {
    const statusValue = transactionType === "true";

    try {
      await api.post("/cards", {
        name: newCardName,
        value: newCardValue,
        status: statusValue,
        sector: newCardSector,
      });
      console.log("Card adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar card:", error);
    }

    setNewCardName("");
    setNewCardValue(0);
    setNewCardSector("");

    onAddCard();
  }

  return (
    <>
      <section className="mb-4 mt-6">
        <h2 className="text-xl font-semibold mb-2 ml-4">Adicionar Novo Card</h2>
        <div className="flex m-4">
          <input
            type="text"
            placeholder="Nome do Card"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            className="border p-2 mr-4"
          />
          <input
            type="number"
            placeholder="Valor"
            value={newCardValue}
            onChange={(e) => setNewCardValue(parseFloat(e.target.value))}
            className="border p-2 mr-4"
          />
          <label className="mr-4">
            Setor:
            <select
              value={newCardSector}
              onChange={(e) => setNewCardSector(e.target.value)}
              className="border p-2 ml-4"
            >
              {sectores.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="mr-4">
            Tipo de Transação:
            <select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              className="border p-2 ml-4"
            >
              <option value="true">Entrada</option>
              <option value="false">Saída</option>
            </select>
          </label>
          <button
            onClick={handleAddCard}
            className="bg-slate-900 text-white px-4 py-2 rounded ml-5"
          >
            Adicionar Card
          </button>
        </div>
      </section>
    </>
  );
}
