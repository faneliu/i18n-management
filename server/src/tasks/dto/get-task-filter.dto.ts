/*
 * @Descripttion:
 * @Author: liufan
 * @Date: 2024-02-04 11:13:27
 * @LastEditors: liufan
 * @LastEditTime: 2024-02-26 18:45:36
 */
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
