-- AlterTable
ALTER TABLE `product_category` MODIFY `parent_id` INTEGER NULL,
    MODIFY `create_by` VARCHAR(191) NULL,
    MODIFY `create_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_by` VARCHAR(191) NULL,
    MODIFY `update_time` DATETIME(3) NULL,
    MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;
