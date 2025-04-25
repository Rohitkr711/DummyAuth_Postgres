/*
  Warnings:

  - You are about to drop the column `phno` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phoneno]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phoneno` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phno_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phno",
ADD COLUMN     "phoneno" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneno_key" ON "User"("phoneno");
