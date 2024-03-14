import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statues = exception.getStatus(); // 状态码

    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as object);

    if (statues === HttpStatus.FORBIDDEN) {
      console.log('statues===>', statues);

      response.status(statues).json('1111');
    } else {
      response.status(statues).json({
        ...error,
        timestamp: new Date().toISOString(),
      });
    }
    // response.status(statues).json({
    //   ...error,
    //   timestamp: new Date().toISOString(),
    // });
  }
}
