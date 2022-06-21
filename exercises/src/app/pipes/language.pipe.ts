import { Pipe, PipeTransform } from '@angular/core';
import dict_en from '../../assets/dictionary.json';
import dict_fi from '../../assets/dictionary-fi.json';

@Pipe({
  name: 'language',
})
export class LanguagePipe implements PipeTransform {
  transform(value: unknown, lang: string, key: string): string {
    switch (lang) {
      case 'en':
        return dict_en[key as keyof typeof dict_en];
      case 'fi':
        return dict_fi[key as keyof typeof dict_fi];
      default:
        return '';
    }
  }
}
