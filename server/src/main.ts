/*
 * @Descripttion:
 * @Author: liufan
 * @Date: 2024-02-02 16:22:25
 * @LastEditors: liufan
 * @LastEditTime: 2024-02-25 20:59:41
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transfom.interceptor';
import { Logger } from '@nestjs/common';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { HttpExceptionFilter } from './common/interceptors/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new WrapResponseInterceptor(),
  );
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
