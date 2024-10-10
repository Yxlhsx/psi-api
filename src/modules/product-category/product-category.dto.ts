import { ApiProperty } from '@nestjs/swagger'

/**
 * 新增产品类别 DTO
 */
export class AddProductCategoryDTO {
  @ApiProperty({ description: '父级ID', required: false })
  parentId: number

  @ApiProperty({ description: '产品类别名称' })
  productCategoryName: string
}

/**
 * 修改产品类别 DTO
 */
export class UpdateProductCategoryDTO {
  @ApiProperty({ description: '产品类别ID' })
  productCategoryId: number

  @ApiProperty({ description: '父级ID', required: false })
  parentId: number

  @ApiProperty({ description: '产品类别名称', required: false })
  productCategoryName: string
}
