/*
  Warnings:

  - Added the required column `time` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "time" VARCHAR(16) NOT NULL;
