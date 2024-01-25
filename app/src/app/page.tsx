"use client";

import { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import { api } from "@/services/api";
import { format } from "date-fns";

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
  const [saldo, setSaldo] = useState(0);
  const [saidas, setSaidas] = useState(false);
  const [entradas, setEntradas] = useState(true);

  const fetchData = async () => {
    try {
      const response = await api.get("/cards");
      const data = await response.data;
      setCards(data);
    } catch (error) {
      console.error("Erro ao buscar dados do banco de dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function filterCardsByStatus() {
    for ()
  }

  const filterCardsBySector = (sector: string | null) => {
    setSelectedSector(sector);
  };

  const filteredCards = selectedSector
    ? cards.filter((card) => card.sector === selectedSector)
    : cards;

  return (
    <>
      <Header
        saldo={cards.filter((card) => card.status === true)}
        gastos={1233}
        total={1964}
      />
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
            <button
              onClick={() => filterCardsBySector("transporte")}
              className="bg-slate-900 text-white px-2 py-1 rounded"
            >
              Transporte
            </button>
            <button
              onClick={() => filterCardsBySector("alimentação")}
              className="bg-slate-900 text-white px-2 py-1 rounded"
            >
              Alimentação
            </button>
            <button
              onClick={() => filterCardsBySector("lazer")}
              className="bg-slate-900 text-white px-2 py-1 rounded"
            >
              Lazer
            </button>
          </div>
        </section>
        <section className="w-3/4 h-96 overflow-auto bg-gray-100 p-4">
          <div className="flex flex-col items-center">
            {filteredCards.length > 0 ? (
              filteredCards.map((item) => (
                <Card
                  key={item.id}
                  name={item.name}
                  value={item.value}
                  date={format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")}
                  status={item.status}
                  sector={item.sector}
                />
              ))
            ) : (
              <p>Nenhum card disponível</p>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
