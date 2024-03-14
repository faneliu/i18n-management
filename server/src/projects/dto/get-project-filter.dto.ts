import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetProjectFilterDto {
  @IsOptional()
  @IsString()
  projectName?: string;

  @IsOptional()
  pageNo?: number;

  @IsOptional()
  pageSize?: number;
}
