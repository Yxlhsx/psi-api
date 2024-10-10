import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async queryUser(userName: string, password: string) {
    return this.prisma.user.findUnique({
      where: {
        userName,
        password,
      },
    })
  }
}
