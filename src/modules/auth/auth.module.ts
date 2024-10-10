import { Module } from '@nestjs/common'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
