import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../common/prisma/prisma.service'
import { ProductCategory, Prisma } from '@prisma/client'

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async getProductCategoryById(
    productCategoryId: number,
  ): Promise<ProductCategory | null> {
    return this.prisma.productCategory.findUnique({
      where: {
        productCategoryId,
      },
    })
  }

  async user(
    userWhereUniqueInput: Prisma.ProductCategoryWhereUniqueInput,
  ): Promise<ProductCategory | null> {
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

  async createUser(
    data: Prisma.ProductCategoryCreateInput,
  ): Promise<ProductCategory> {
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

  async deleteUser(
    where: Prisma.ProductCategoryWhereUniqueInput,
  ): Promise<ProductCategory | null> {
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
