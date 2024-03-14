/*
 * @Descripttion:
 * @Author: liufan
 * @Date: 2024-01-24 10:50:53
 * @LastEditors: liufan
 * @LastEditTime: 2024-01-25 00:33:45
 */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
