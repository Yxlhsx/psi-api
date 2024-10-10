import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductCategoryModule } from './modules/product-category/product-category.module'
import { AuthModule } from './modules/auth/auth.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JTW_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    AuthModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
