import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx:HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status:number = exception.getStatus();
    const message:string = exception.message;

    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
      });
  }
}
