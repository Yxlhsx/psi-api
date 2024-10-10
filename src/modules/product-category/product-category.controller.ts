import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ProductCategory } from '@prisma/client'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ProductCategoryService } from './product-category.service'
import {
  AddProductCategoryDTO,
  UpdateProductCategoryDTO,
} from './product-category.dto'

@ApiTags('产品类别')
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @ApiOperation({ summary: '查询产品类别详情' })
  @Get(':productCategoryId')
  async getProductCategory(
    @Param('productCategoryId', ParseIntPipe)
    productCategoryId: number,
  ): Promise<ProductCategory> {
    return this.productCategoryService.user({ productCategoryId })
  }

  @ApiOperation({ summary: '新增产品类别' })
  @Post('')
  async addProductCategory(
    @Body()
    addProductCategoryDTO: AddProductCategoryDTO,
  ): Promise<ProductCategory> {
    return this.productCategoryService.createUser(addProductCategoryDTO)
  }

  @ApiOperation({ summary: '修改产品类别' })
  @Put('')
  async updateProductCategory(
    @Body()
    updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): Promise<void> {
    await this.productCategoryService.updateUser({
      where: { productCategoryId: updateProductCategoryDTO.productCategoryId },
      data: updateProductCategoryDTO,
    })
  }

  @ApiOperation({ summary: '删除产品类别' })
  @Delete(':productCategoryId')
  async delProductCategory(
    @Param('productCategoryId', ParseIntPipe)
    productCategoryId: number,
  ): Promise<void> {
    await this.productCategoryService.deleteUser({ productCategoryId })
  }
}
