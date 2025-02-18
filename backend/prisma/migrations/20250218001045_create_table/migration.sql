/*
  Warnings:

  - You are about to alter the column `birth` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `ageinyears` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Made the column `protocol` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deficiencyContext` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_cpf_key` ON `user`;

-- DropIndex
DROP INDEX `User_rg_key` ON `user`;

-- DropIndex
DROP INDEX `User_tel_key` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `protocol` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `bairro` VARCHAR(191) NULL,
    MODIFY `birth` DATETIME(3) NOT NULL,
    MODIFY `ageinyears` INTEGER NOT NULL,
    MODIFY `deficiencyContext` VARCHAR(191) NOT NULL;
