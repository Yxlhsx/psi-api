/*
  Warnings:

  - A unique constraint covering the columns `[product_category_name]` on the table `psi_product_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_name]` on the table `psi_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `psi_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `psi_user` ADD COLUMN `nick_name` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `psi_product_category_product_category_name_key` ON `psi_product_category`(`product_category_name`);

-- CreateIndex
CREATE UNIQUE INDEX `psi_user_user_name_key` ON `psi_user`(`user_name`);
