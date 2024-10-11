import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
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

  /**
   * 根据ID查询产品类别
   * @param productCategoryId 产品类别ID
   * @returns 产品类别实体
   */
  @ApiOperation({ summary: '根据ID查询产品类别' })
  @Get(':productCategoryId')
  async getProductCategoryById(
    @Param('productCategoryId', ParseIntPipe)
    productCategoryId: number,
  ): Promise<ProductCategory> {
    const productCategory =
      await this.productCategoryService.getProductCategoryById(
        productCategoryId,
      )

    if (!productCategory) {
      throw new HttpException('该数据不存在', 400)
    }

    return productCategory
  }

  @ApiOperation({ summary: '查询产品类别列表' })
  @Get('list')
  async getProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoryService.users({})
  }

  /**
   * 新增产品类别
   * @param addProductCategoryDTO 新增产品类别DTO
   * @returns 产品类别
   */
  @ApiOperation({ summary: '新增产品类别' })
  @Post('')
  async addProductCategory(
    @Body()
    addProductCategoryDTO: AddProductCategoryDTO,
  ): Promise<ProductCategory> {
    return this.productCategoryService.createUser(addProductCategoryDTO)
  }

  /**
   * 修改产品类别
   * @param updateProductCategoryDTO 修改产品类别DTO
   */
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

  /**
   * 删除产品类别
   * @param productCategoryId 产品类别ID
   */
  @ApiOperation({ summary: '删除产品类别' })
  @Delete(':productCategoryId')
  async delProductCategory(
    @Param('productCategoryId', ParseIntPipe)
    productCategoryId: number,
  ): Promise<void> {
    await this.productCategoryService.deleteUser({ productCategoryId })
  }
}
