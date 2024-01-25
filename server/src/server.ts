import { fastify, FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "./lib/prisma";
import cors from "@fastify/cors";

const server = fastify({ logger: true });
server.register(cors);

server.get("/cards", async (req: FastifyRequest, reply: FastifyReply) => {
  const cards = await prisma.card.findMany();
  reply.send(cards);
});

server.post("/cards", async (req: FastifyRequest, reply: FastifyReply) => {
  await prisma.card.create({
    data: {
      name: req.body.name,
      value: req.body.value,
      status: req.body.status,
      sector: req.body.sector,
    },
  });
  reply.send({ message: "Card criado" });
});

server.put("/cards/:id", async (req: FastifyRequest, reply: FastifyReply) => {
  const id = req.params.id;

  const oldCard = await prisma.card.findUnique({
    where: { id: Number(id) },
  });

  await prisma.card.update({
    where: { id: Number(id) },
    data: {
      ...oldCard,
      status: req.body.status,
    },
  });

  reply.send({ message: "Card atualizado" });
});

server.delete(
  "/cards/:id",
  async (req: FastifyRequest, reply: FastifyReply) => {
    const id = req.params.id;
    await prisma.card.delete({
      where: { id: Number(id) },
    });
    reply.send({ message: "Card deletado" });
  }
);

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
