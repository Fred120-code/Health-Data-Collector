-- CreateTable
CREATE TABLE "HealthData" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "tension" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthData_pkey" PRIMARY KEY ("id")
);
