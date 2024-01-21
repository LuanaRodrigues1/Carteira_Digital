"use client";

import { api } from "@/services/api";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { format } from "date-fns";

interface Card {
  id: number;
  name: string;
  value: number;
  createdAt: string;
  status: boolean;
}

export default function Home() {
  const [card, setCard] = useState<Card[]>([]);
  const fetchData = async () => {
    try {
      const response = await api.get("/cards");
      const data = await response.data;

      setCard(data);
    } catch (error) {
      console.error("Erro ao buscar dados do banco de dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {card ? (
        card.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            value={item.value}
            date={format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")}
            status={item.status}
          />
        ))
      ) : (
        <p>Nenhum card disponível</p>
      )}
    </>
  );
}
