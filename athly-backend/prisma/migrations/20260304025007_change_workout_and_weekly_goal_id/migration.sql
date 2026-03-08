/*
  Warnings:

  - The primary key for the `weekly_goals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `weekly_goals` table. All the data in the column will be lost.
  - The required column `id` was added to the `weekly_goals` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `training_plan_id` to the `workouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "weekly_goals" DROP CONSTRAINT "weekly_goals_pkey",
DROP COLUMN "uuid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "weekly_goals_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "training_plan_id" TEXT NOT NULL,
ADD COLUMN     "weekly_goal_id" TEXT;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_weekly_goal_id_fkey" FOREIGN KEY ("weekly_goal_id") REFERENCES "weekly_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
