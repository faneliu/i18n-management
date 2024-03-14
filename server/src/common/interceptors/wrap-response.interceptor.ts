/*
 * @Descripttion:
 * @Author: liufan
 * @Date: 2024-01-23 00:11:19
 * @LastEditors: liufan
 * @LastEditTime: 2024-01-23 00:53:40
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}
