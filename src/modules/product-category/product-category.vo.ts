import { ApiProperty } from '@nestjs/swagger'

/**
 * 产品类别列表 VO
 */
export class ProductCategoryListVO {
  @ApiProperty({ description: '产品类别ID' })
  productCategoryId: number

  @ApiProperty({ description: '父类别ID', required: false })
  parentId?: number

  @ApiProperty({ description: '产品类别名称' })
  productCategoryName: string

  @ApiProperty({ description: '创建时间' })
  createTime: Date
}
