import { LanguageEnum } from './translation.constants';

export interface Translation {
  translationId: string;
  language: LanguageEnum;
  key: string;
  value: string;
}
