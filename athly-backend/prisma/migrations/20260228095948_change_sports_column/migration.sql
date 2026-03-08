/*
  Warnings:

  - You are about to drop the column `sport_type` on the `training_plans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "training_plans" DROP COLUMN "sport_type",
ADD COLUMN     "sports" "SportType"[];
