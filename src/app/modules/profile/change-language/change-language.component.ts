import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { AvailableLanguages } from './types/available-laguages';
import { LANGUAGES } from '../../../constants/languages';

@Component({
  selector: 'app-change-language',
  imports: [MatMenuModule],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss',
})
export class ChangeLanguageComponent {
  public currentLang: WritableSignal<string> = signal<string>('English');
  constructor(private readonly translate: TranslateService) {
    this.setCurrentLang();
    this.translate.onLangChange.subscribe(() => {
      this.setCurrentLang();
    });
  }

  private setCurrentLang(): void {
    const currentLang: AvailableLanguages = this.translate
      .currentLang as AvailableLanguages;
    this.currentLang.set(LANGUAGES[currentLang]);
  }

  public changeLanguage(language: AvailableLanguages): void {
    localStorage.setItem('language', language);
    this.translate.use(language);
  }
}
