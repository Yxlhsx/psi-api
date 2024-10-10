/*
  Warnings:

  - You are about to drop the `productcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `productcategory`;

-- CreateTable
CREATE TABLE `product_category` (
    `product_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_category_name` VARCHAR(191) NOT NULL,
    `parent_id` INTEGER NOT NULL,
    `create_by` VARCHAR(191) NOT NULL,
    `create_time` DATETIME(3) NOT NULL,
    `update_by` VARCHAR(191) NOT NULL,
    `update_time` DATETIME(3) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL,

    PRIMARY KEY (`product_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
