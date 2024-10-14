import { ProductCategory, Prisma } from '@prisma/client'
import { HttpException, Injectable } from '@nestjs/common'
import { PrismaService } from '@/common/prisma/prisma.service'
import { ProductCategoryListQueryDTO } from './product-category.dto'

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async findProductCategory(query: Prisma.ProductCategoryWhereUniqueInput) {
    return this.prisma.productCategory.findUnique({
      where: query,
    })
  }

  async findProductCategoryList(query: ProductCategoryListQueryDTO) {
    const where = {} as Prisma.ProductCategoryWhereInput

    if (query.parentId) {
      where.parentId = query.parentId
    }

    if (query.productCategoryName) {
      where.productCategoryName = {
        contains: query.productCategoryName,
      }
    }

    return this.prisma.productCategory.findMany({
      where,
    })
  }

  async addProductCategory(data: Prisma.ProductCategoryCreateInput): Promise<ProductCategory> {
    const existingProductCategory = await this.findProductCategory({
      productCategoryName: data.productCategoryName,
    })

    if (existingProductCategory) {
      throw new HttpException('此产品类别已存在', 400)
    }

    const newData = {} as Prisma.ProductCategoryCreateInput

    if (data.parentId) {
      newData.parentId = data.parentId
    }
    newData.productCategoryName = data.productCategoryName

    return this.prisma.productCategory.create({
      data: newData,
    })
  }

  async updateUser(params: {
    where: Prisma.ProductCategoryWhereUniqueInput
    data: Prisma.ProductCategoryUpdateInput
  }): Promise<ProductCategory> {
    const { where, data } = params
    return this.prisma.productCategory.update({
      data,
      where,
    })
  }

  async delProductCategory(productCategoryId: number) {
    const existingProductCategory = await this.prisma.productCategory.findUnique({
      where: {
        productCategoryId,
      },
    })

    if (!existingProductCategory) {
      throw new HttpException('此产品类别不存在', 400)
    }

    return this.prisma.productCategory.delete({
      where: {
        productCategoryId,
      },
    })
  }
}
