/*
  Warnings:

  - Added the required column `file` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "file" VARCHAR(128) NOT NULL;
