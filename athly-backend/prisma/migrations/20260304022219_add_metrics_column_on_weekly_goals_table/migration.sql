/*
  Warnings:

  - You are about to drop the `workout_blocks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `metrics` to the `weekly_goals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "workout_blocks" DROP CONSTRAINT "workout_blocks_workout_id_fkey";

-- AlterTable
ALTER TABLE "weekly_goals" ADD COLUMN     "metrics" JSONB NOT NULL;

-- DropTable
DROP TABLE "workout_blocks";
