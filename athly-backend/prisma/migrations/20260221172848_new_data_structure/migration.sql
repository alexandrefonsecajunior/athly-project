/*
  Warnings:

  - The values [in_progress,completed] on the enum `WorkoutStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('STANDARD', 'PREMIUM', 'ADMIN');

-- CreateEnum
CREATE TYPE "WeeklyGoalStatus" AS ENUM ('PLANNED', 'GENERATED', 'CANCELLED', 'LOCKED');

-- AlterEnum
BEGIN;
CREATE TYPE "WorkoutStatus_new" AS ENUM ('scheduled', 'done', 'skipped', 'partial');
ALTER TABLE "Workout" ALTER COLUMN "status" TYPE "WorkoutStatus_new" USING ("status"::text::"WorkoutStatus_new");
ALTER TYPE "WorkoutStatus" RENAME TO "WorkoutStatus_old";
ALTER TYPE "WorkoutStatus_new" RENAME TO "WorkoutStatus";
DROP TYPE "public"."WorkoutStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "RoleEnum" NOT NULL DEFAULT 'STANDARD',
ADD COLUMN     "weight" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Equipment" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserEquipment" (
    "userId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserEquipment_pkey" PRIMARY KEY ("userId","equipmentId")
);

-- CreateTable
CREATE TABLE "WeeklyGoal" (
    "uuid" TEXT NOT NULL,
    "trainingPlanId" TEXT NOT NULL,
    "weekStartDate" TIMESTAMP(3) NOT NULL,
    "weekEndDate" TIMESTAMP(3) NOT NULL,
    "status" "WeeklyGoalStatus" NOT NULL DEFAULT 'PLANNED',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyGoal_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "UserEquipment" ADD CONSTRAINT "UserEquipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEquipment" ADD CONSTRAINT "UserEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeeklyGoal" ADD CONSTRAINT "WeeklyGoal_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
