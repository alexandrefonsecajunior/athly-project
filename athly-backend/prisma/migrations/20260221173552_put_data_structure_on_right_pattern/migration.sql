/*
  Warnings:

  - You are about to drop the `Equipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Integration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserEquipment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeeklyGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutBlocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutFeedback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Integration" DROP CONSTRAINT "Integration_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlan" DROP CONSTRAINT "TrainingPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEquipment" DROP CONSTRAINT "UserEquipment_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "UserEquipment" DROP CONSTRAINT "UserEquipment_userId_fkey";

-- DropForeignKey
ALTER TABLE "WeeklyGoal" DROP CONSTRAINT "WeeklyGoal_trainingPlanId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutBlocks" DROP CONSTRAINT "WorkoutBlocks_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutFeedback" DROP CONSTRAINT "WorkoutFeedback_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutFeedback" DROP CONSTRAINT "WorkoutFeedback_workoutId_fkey";

-- DropTable
DROP TABLE "Equipment";

-- DropTable
DROP TABLE "Integration";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "TrainingPlan";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserEquipment";

-- DropTable
DROP TABLE "WeeklyGoal";

-- DropTable
DROP TABLE "Workout";

-- DropTable
DROP TABLE "WorkoutBlocks";

-- DropTable
DROP TABLE "WorkoutFeedback";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "RoleEnum" NOT NULL DEFAULT 'STANDARD',
    "date_of_birth" TIMESTAMP(3),
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "goals" TEXT[],
    "availability" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "date_scheduled" TIMESTAMP(3) NOT NULL,
    "sport_type" "SportType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "blocks" JSONB NOT NULL,
    "status" "WorkoutStatus" NOT NULL,
    "intensity" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_blocks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,
    "targetPace" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "workout_id" TEXT NOT NULL,

    CONSTRAINT "workout_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_plans" (
    "id" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "weeks" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "training_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_feedbacks" (
    "id" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "effort" INTEGER NOT NULL,
    "fatigue" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "workout_id" TEXT NOT NULL,

    CONSTRAINT "workout_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "connected" BOOLEAN NOT NULL,
    "type" "IntegrationType" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user_equipments" (
    "user_id" TEXT NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_equipments_pkey" PRIMARY KEY ("user_id","equipment_id")
);

-- CreateTable
CREATE TABLE "weekly_goals" (
    "uuid" TEXT NOT NULL,
    "training_plan_id" TEXT NOT NULL,
    "week_start_date" TIMESTAMP(3) NOT NULL,
    "week_end_date" TIMESTAMP(3) NOT NULL,
    "status" "WeeklyGoalStatus" NOT NULL DEFAULT 'PLANNED',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weekly_goals_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refresh_token_key" ON "sessions"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "training_plans_user_id_key" ON "training_plans"("user_id");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_blocks" ADD CONSTRAINT "workout_blocks_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_feedbacks" ADD CONSTRAINT "workout_feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_feedbacks" ADD CONSTRAINT "workout_feedbacks_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipments" ADD CONSTRAINT "user_equipments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_equipments" ADD CONSTRAINT "user_equipments_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_goals" ADD CONSTRAINT "weekly_goals_training_plan_id_fkey" FOREIGN KEY ("training_plan_id") REFERENCES "training_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
