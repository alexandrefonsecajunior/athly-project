/*
  Warnings:

  - You are about to drop the column `availability` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "availability",
ADD COLUMN     "available_days" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "weekly_goals" ADD COLUMN     "previous_week_analysis" JSONB;

-- CreateTable
CREATE TABLE "user_effort_zones" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "vdot_score" DOUBLE PRECISION,
    "max_heart_rate" INTEGER,
    "rest_heart_rate" INTEGER,
    "data_source" TEXT NOT NULL,
    "easy_pace_min" INTEGER NOT NULL,
    "easy_pace_max" INTEGER NOT NULL,
    "marathon_pace_min" INTEGER NOT NULL,
    "marathon_pace_max" INTEGER NOT NULL,
    "threshold_pace_min" INTEGER NOT NULL,
    "threshold_pace_max" INTEGER NOT NULL,
    "interval_pace_min" INTEGER NOT NULL,
    "interval_pace_max" INTEGER NOT NULL,
    "repetition_pace_min" INTEGER NOT NULL,
    "repetition_pace_max" INTEGER NOT NULL,
    "hr_zones" JSONB,
    "calculated_from" JSONB NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_effort_zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_reasonings" (
    "id" TEXT NOT NULL,
    "workout_id" TEXT NOT NULL,
    "weekly_goal_id" TEXT NOT NULL,
    "justification" TEXT NOT NULL,
    "data_points_used" JSONB NOT NULL,
    "prompt_version" TEXT NOT NULL,
    "model_used" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_reasonings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_reasonings_workout_id_key" ON "ai_reasonings"("workout_id");

-- AddForeignKey
ALTER TABLE "user_effort_zones" ADD CONSTRAINT "user_effort_zones_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_reasonings" ADD CONSTRAINT "ai_reasonings_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_reasonings" ADD CONSTRAINT "ai_reasonings_weekly_goal_id_fkey" FOREIGN KEY ("weekly_goal_id") REFERENCES "weekly_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
