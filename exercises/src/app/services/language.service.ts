import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly languageSubject = new BehaviorSubject<string>('en');
  readonly language$ = this.languageSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor() {}

  get currentLanguage(): string {
    return this.languageSubject.value;
  }

  changeLanguage(language: string): void {
    this.languageSubject.next(language);
  }
}
