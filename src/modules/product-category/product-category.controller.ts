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
  Query,
  Request,
} from '@nestjs/common'
import { ProductCategory } from '@prisma/client'
import {
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { ProductCategoryService } from './product-category.service'
import {
  AddProductCategoryDTO,
  UpdateProductCategoryDTO,
  ProductCategoryListQuery,
} from './product-category.dto'

@ApiTags('产品类别')
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get('list')
  @ApiOperation({ summary: '查询产品类别列表' })
  @ApiQuery({
    name: 'query',
    type: ProductCategoryListQuery,
  })
  async getProductCategoryList(
    @Query('query')
    query: ProductCategoryListQuery,
    @Request()
    request: any,
  ): Promise<ProductCategory[]> {
    console.log(query)

    console.log(request.query)

    return this.productCategoryService.getProductCategoryList(query)
  }

  /**
   * 根据ID查询产品类别
   * @param productCategoryId 产品类别ID
   * @returns 产品类别实体
   */
  @Get(':productCategoryId')
  @ApiOperation({ summary: '根据ID查询产品类别' })
  @ApiParam({ name: 'productCategoryId', description: '产品类别ID' })
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

  /**
   * 新增产品类别
   * @param addProductCategoryDTO 新增产品类别DTO
   * @returns 产品类别
   */
  @Post('')
  @ApiOperation({ summary: '新增产品类别' })
  async addProductCategory(
    @Body()
    addProductCategoryDTO: AddProductCategoryDTO,
  ): Promise<string> {
    const newProductCategory =
      await this.productCategoryService.addProductCategory(
        addProductCategoryDTO,
      )

    if (newProductCategory.parentId) {
      return '新增成功'
    }

    return '新增失败'
  }

  /**
   * 修改产品类别
   * @param updateProductCategoryDTO 修改产品类别DTO
   */
  @Put('')
  @ApiOperation({ summary: '修改产品类别' })
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
  @Delete(':productCategoryId')
  @ApiOperation({ summary: '删除产品类别' })
  async delProductCategory(
    @Param('productCategoryId', ParseIntPipe)
    productCategoryId: number,
  ): Promise<void> {
    await this.productCategoryService.deleteUser({ productCategoryId })
  }
}
