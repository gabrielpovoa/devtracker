/*
  Warnings:

  - You are about to drop the column `data` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `horaRetorno` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `horaSaida` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `kmRetorno` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `kmSaida` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `tipoDeGasto` on the `expense` table. All the data in the column will be lost.
  - Added the required column `dia` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoGasto` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expense` DROP COLUMN `data`,
    DROP COLUMN `horaRetorno`,
    DROP COLUMN `horaSaida`,
    DROP COLUMN `kmRetorno`,
    DROP COLUMN `kmSaida`,
    DROP COLUMN `tipoDeGasto`,
    ADD COLUMN `dia` DATETIME(3) NOT NULL,
    ADD COLUMN `horaFinal` VARCHAR(191) NULL,
    ADD COLUMN `horaInicial` VARCHAR(191) NULL,
    ADD COLUMN `horasMovimento` VARCHAR(191) NULL,
    ADD COLUMN `kmFinal` INTEGER NULL,
    ADD COLUMN `kmInicial` INTEGER NULL,
    ADD COLUMN `kmRodados` INTEGER NULL,
    ADD COLUMN `tipoGasto` VARCHAR(191) NOT NULL;
