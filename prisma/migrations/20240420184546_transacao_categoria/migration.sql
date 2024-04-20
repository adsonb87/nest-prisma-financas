/*
  Warnings:

  - You are about to drop the column `tipo` on the `transacoes` table. All the data in the column will be lost.
  - You are about to drop the `_TagToTransacao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoriaId` to the `transacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoTransacao` to the `transacoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_TagToTransacao` DROP FOREIGN KEY `_TagToTransacao_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TagToTransacao` DROP FOREIGN KEY `_TagToTransacao_B_fkey`;

-- AlterTable
ALTER TABLE `transacoes` DROP COLUMN `tipo`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `tipoTransacao` ENUM('RECEITA', 'DESPESA') NOT NULL;

-- DropTable
DROP TABLE `_TagToTransacao`;

-- DropTable
DROP TABLE `tags`;

-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipoCategoria` ENUM('RECEITA', 'DESPESA') NOT NULL,

    UNIQUE INDEX `categorias_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transacoes` ADD CONSTRAINT `transacoes_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
