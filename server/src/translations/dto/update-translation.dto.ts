import { IsNotEmpty, IsOptional } from 'class-validator';
import { LanguageEnum } from '../translation.constants';

export class UpdateTranslateDto {
  @IsOptional()
  id?: string;
  @IsOptional()
  language?: LanguageEnum;

  @IsOptional()
  key?: string;

  @IsOptional()
  value?: string;
}
