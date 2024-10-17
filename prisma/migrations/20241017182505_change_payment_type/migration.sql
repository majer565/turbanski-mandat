/*
  Warnings:

  - Changed the type of `payment` on the `Ticket` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "payment",
ADD COLUMN     "payment" VARCHAR(10) NOT NULL;

-- DropEnum
DROP TYPE "Payment";
