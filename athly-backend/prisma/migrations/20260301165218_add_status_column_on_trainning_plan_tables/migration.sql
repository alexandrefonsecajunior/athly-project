-- CreateEnum
CREATE TYPE "TrainingPlanStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED', 'LOCKED', 'DRAFT');

-- AlterTable
ALTER TABLE "training_plans" ADD COLUMN     "status" "TrainingPlanStatus" NOT NULL DEFAULT 'DRAFT';
