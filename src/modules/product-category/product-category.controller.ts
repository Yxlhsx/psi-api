import { ProductCategory } from '@prisma/client'
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
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
} from '@nestjs/common'
import { ProductCategoryService } from './product-category.service'
import {
  AddProductCategoryDTO,
  UpdateProductCategoryDTO,
  ProductCategoryListQueryDTO,
} from './product-category.dto'
import { ProductCategoryListVO } from './product-category.vo'

@ApiTags('产品类别')
@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  /**
   * 查询产品类别列表
   * @param query 查询条件
   * @returns 产品类别列表
   */
  @Get('list')
  @ApiOperation({ summary: '查询产品类别列表' })
  @ApiResponse({ type: ProductCategoryListVO })
  async getProductCategoryList(
    @Query()
    query: ProductCategoryListQueryDTO,
  ) {
    return this.productCategoryService.findList(query)
  }

  /**
   * 根据ID查询产品类别
   * @param productCategoryId 产品类别ID
   * @returns 产品类别实体
   */
  @Get(':productCategoryId')
  @ApiOperation({ summary: '根据ID查询产品类别' })
  @ApiParam({ name: 'productCategoryId', description: '产品类别ID' })
  @ApiResponse({ status: 400, example: '产品类别不存在' })
  async getProductCategoryById(
    @Param('productCategoryId', ParseIntPipe)
    productCategoryId: number,
  ): Promise<ProductCategory> {
    const productCategory = await this.productCategoryService.find({
      productCategoryId,
    })

    if (!productCategory) {
      throw new HttpException('产品类别不存在', 400)
    }

    return productCategory
  }

  /**
   * 新增产品类别
   * @param addProductCategoryDTO 新增产品类别DTO
   * @returns 产品类别
   */
  @Post()
  @ApiOperation({ summary: '新增产品类别' })
  async addProductCategory(
    @Body()
    addProductCategoryDTO: AddProductCategoryDTO,
  ): Promise<string> {
    await this.productCategoryService.add(addProductCategoryDTO)

    return '新增成功'
  }

  /**
   * 修改产品类别
   * @param updateProductCategoryDTO 修改产品类别DTO
   */
  @Put()
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
  @ApiParam({ name: 'productCategoryId', description: '产品类别ID' })
  async delProductCategory(
    @Param('productCategoryId', ParseIntPipe)
    productCategoryId: number,
  ): Promise<void> {
    await this.productCategoryService.del(productCategoryId)
  }
}
