-- CreateEnum
CREATE TYPE "Payment" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "payment" "Payment" NOT NULL DEFAULT 'UNPAID',
ADD COLUMN     "paymentDate" VARCHAR(128);
