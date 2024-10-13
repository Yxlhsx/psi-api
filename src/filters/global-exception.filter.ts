import { Request, Response } from 'express'
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'

@Catch(Error)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    response.status(500).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    })
  }
}
