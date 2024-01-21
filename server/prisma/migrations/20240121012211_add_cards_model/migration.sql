-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);
