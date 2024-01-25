"use client";

import { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import { api } from "@/services/api";
import { format } from "date-fns";
import AddNewCard from "./components/AddNewCard";

interface CardData {
  id: number;
  name: string;
  value: number;
  createdAt: string;
  sector: string;
  status: boolean;
}

export default function Home() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectores = [
    "Alimentação",
    "Investimentos",
    "Transporte",
    "Lazer",
    "Saúde",
    "Educação",
    "Vestimentas",
    "Contas",
    "Salário",
  ];

  async function fetchData() {
    try {
      const response = await api.get("/cards");
      const data = await response.data;
      setCards(data);
    } catch (error) {
      console.error("Erro ao buscar dados do banco de dados:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterCardsByStatus(status: boolean) {
    let valueTotal = 0;

    for (let contador = 0; contador < cards.length; contador++) {
      if (cards[contador].status === status) {
        valueTotal = valueTotal + cards[contador].value;
      }
    }

    const formattedTotal = valueTotal.toFixed(2);

    return Number(formattedTotal);
  }

  function filterCardsBySector(sector: string | null) {
    setSelectedSector(sector);
  }

  const filteredCards = selectedSector
    ? cards.filter((card) => card.sector === selectedSector)
    : cards;

  async function handleDeleteCard(id: number) {
    try {
      await api.delete(`/cards/${id}`);
      setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o card:", error);
    }
  }

  async function handleUpdateCard(id: number, status: boolean) {
    try {
      await api.put(`/cards/${id}`, {
        status: !status,
      });

      const response = await api.get("/cards");
      const data = await response.data;
      setCards(data);
    } catch (error) {
      console.error("Erro ao atualizar o card:", error);
    }
  }

  async function handleCardAdded() {
    fetchData();
  }

  return (
    <>
      <Header
        entradas={filterCardsByStatus(true)}
        saidas={filterCardsByStatus(false)}
      />
      <AddNewCard onAddCard={handleCardAdded} sectores={sectores} />

      <section className="flex p-4">
        <section className="w-1/4 bg-gray-200 p-4">
          <h1 className="text-xl font-semibold mb-4">Opções</h1>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => filterCardsBySector(null)}
              className="bg-slate-900 text-white px-2 py-1 rounded"
            >
              Mostrar Todos
            </button>
            {sectores.map((item) => (
              <button
                key={item}
                onClick={() => filterCardsBySector(item)}
                className="bg-slate-900 text-white px-2 py-1 rounded"
              >
                {item}
              </button>
            ))}
          </div>
        </section>
        <section className="w-3/4 bg-gray-100 p-4">
          {filteredCards.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-slate-700 p-2">Nome</th>
                  <th className="border border-slate-700 p-2 bg-slate-200">
                    Valor
                  </th>
                  <th className="border border-slate-700 p-2">Data</th>
                  <th className="border border-slate-700 p-2 bg-slate-200">
                    Status
                  </th>
                  <th className="border border-slate-700 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCards.map((item) => (
                  <tr key={item.id} className="border">
                    <Card
                      id={item.id}
                      name={item.name}
                      value={item.value}
                      date={format(
                        new Date(item.createdAt),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                      status={item.status}
                      onDelete={handleDeleteCard}
                      sector={item.sector}
                      onUpdate={handleUpdateCard}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhum card disponível</p>
          )}
        </section>
      </section>
    </>
  );
}
