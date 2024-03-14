import { IsNotEmpty } from 'class-validator';
import { LanguageEnum } from '../translation.constants';

export class CreateTranslateDto {
  @IsNotEmpty()
  language: LanguageEnum;

  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  value: string;

  @IsNotEmpty()
  projectId: string;
}
