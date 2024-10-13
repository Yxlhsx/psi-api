import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

/**
 * 新增产品类别 DTO
 */
export class AddProductCategoryDTO {
  @ApiProperty({ description: '父类别ID', required: false })
  @IsOptional()
  @IsInt()
  parentId?: number

  @ApiProperty({ description: '产品类别名称' })
  @IsNotEmpty()
  @IsString()
  productCategoryName: string
}

/**
 * 修改产品类别 DTO
 */
export class UpdateProductCategoryDTO {
  @ApiProperty({ description: '产品类别ID' })
  productCategoryId: number

  @ApiProperty({ description: '父类别ID', required: false })
  parentId: number

  @ApiProperty({ description: '产品类别名称', required: false })
  productCategoryName: string
}

/**
 * 查询产品类别 DTO
 */
export class ProductCategoryListQueryDTO {
  @ApiProperty({ description: '产品类别名称', required: false })
  productCategoryName: string

  @ApiProperty({ description: '父类别ID', required: false })
  parentId: number
}
