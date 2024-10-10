import { Module } from '@nestjs/common'
import { ProductCategoryController } from './product-category.controller'
import { ProductCategoryService } from './product-category.service'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [ProductCategoryController],
  providers: [PrismaService, ProductCategoryService],
})
export class ProductCategoryModule {}
