/*
 * @Descripttion:
 * @Author: liufan
 * @Date: 2024-02-03 23:46:17
 * @LastEditors: liufan
 * @LastEditTime: 2024-02-09 18:33:50
 */
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  finishBy: string;
}
