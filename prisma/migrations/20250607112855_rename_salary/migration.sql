/*
  Warnings:

  - You are about to drop the column `isSalarayCut` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "isSalarayCut",
ADD COLUMN     "isSalaryCut" BOOLEAN NOT NULL DEFAULT false;
