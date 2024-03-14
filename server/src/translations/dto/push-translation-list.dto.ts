import { IsArray, IsNotEmpty } from 'class-validator';
import { Translation } from '../translation.model';
import { LanguageEnum } from '../translation.constants';

export class PushTranslationListDto {
  @IsNotEmpty()
  projectId: string;

  @IsNotEmpty()
  language: LanguageEnum;

  @IsNotEmpty()
  translationList: Array<{
    id?: string;
    language?: LanguageEnum;
    key: string;
    value: string;
  }>;
}
