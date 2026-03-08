-- CreateTable
CREATE TABLE "WorkoutBlocks" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "distance" INTEGER NOT NULL,
    "targetPace" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "WorkoutBlocks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutBlocks" ADD CONSTRAINT "WorkoutBlocks_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
