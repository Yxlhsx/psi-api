import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { HttpExceptionFilter } from '@/filters/http-exception.filter'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // swagger-ui
  const config = new DocumentBuilder().setTitle('PSI').setDescription('进销存系统').setVersion('1.0.0').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger-ui', app, document)

  // 全局异常
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(3000)
}
bootstrap()
