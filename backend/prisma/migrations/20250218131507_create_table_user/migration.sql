/*
  Warnings:

  - Added the required column `housenumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `complement` VARCHAR(191) NULL,
    ADD COLUMN `housenumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `term` VARCHAR(191) NOT NULL;
