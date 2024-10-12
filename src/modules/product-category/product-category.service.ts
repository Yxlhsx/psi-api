import { Injectable } from '@nestjs/common'
import { ProductCategory, Prisma } from '@prisma/client'
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

  async user(userWhereUniqueInput: Prisma.ProductCategoryWhereUniqueInput): Promise<ProductCategory | null> {
    return this.prisma.productCategory.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async users(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ProductCategoryWhereUniqueInput
    where?: Prisma.ProductCategoryWhereInput
    orderBy?: Prisma.ProductCategoryOrderByWithRelationInput
  }): Promise<ProductCategory[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.productCategory.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async addProductCategory(data: Prisma.ProductCategoryCreateInput): Promise<ProductCategory> {
    const existingProductCategory = await this.findProductCategory({
      productCategoryName: data.productCategoryName,
    })

    if (existingProductCategory) {
      throw new Error('此产品类别已存在')
    }

    return this.prisma.productCategory.create({
      data,
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

  async deleteUser(where: Prisma.ProductCategoryWhereUniqueInput): Promise<ProductCategory | null> {
    const existingUser = await this.prisma.productCategory.findUnique({
      where,
    })

    if (!existingUser) {
      throw new Error('User not found')
    }

    return this.prisma.productCategory.delete({
      where,
    })
  }
}
