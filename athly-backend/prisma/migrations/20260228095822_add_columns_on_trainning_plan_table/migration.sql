/*
  Warnings:

  - Added the required column `objective` to the `training_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sport_type` to the `training_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SportType" ADD VALUE 'triathlon';
ALTER TYPE "SportType" ADD VALUE 'duathlon';

-- AlterTable
ALTER TABLE "training_plans" ADD COLUMN     "auto_generate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "objective" TEXT NOT NULL,
ADD COLUMN     "sport_type" "SportType" NOT NULL,
ADD COLUMN     "target_date" TIMESTAMP(3);
