import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { GlobalExceptionFilter } from '@/filters/global-exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 全局异常
  false && app.useGlobalFilters(new GlobalExceptionFilter())

  // 全局自动参数校验
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      transform: true,
    }),
  )

  // swagger-ui
  const config = new DocumentBuilder()
    .setTitle('PSI')
    .setDescription('进销存系统')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger-ui', app, document)

  await app.listen(3000)
}
bootstrap()
