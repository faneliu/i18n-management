import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LanguageEnum } from '../translation.constants';

export class GetTranslatesFilterDto {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsEnum(LanguageEnum)
  language?: LanguageEnum;

  @IsOptional()
  @IsString()
  key?: string;

  @IsOptional()
  pageNo?: number;

  @IsOptional()
  pageSize?: number;

  @IsOptional()
  id?: string;
}
