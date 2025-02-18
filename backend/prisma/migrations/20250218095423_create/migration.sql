/*
  Warnings:

  - Made the column `city` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `neighborhood` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `city` VARCHAR(191) NOT NULL,
    MODIFY `neighborhood` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;
