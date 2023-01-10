/*
  Warnings:

  - Made the column `name` on table `Album` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Album` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Album` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Songs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Songs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Songs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Songs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Songs" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
