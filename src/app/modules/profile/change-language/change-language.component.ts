import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-language',
  imports: [],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss',
})
export class ChangeLanguageComponent {
  public currentLanguage = localStorage.getItem('language') || 'en';

  constructor(private readonly translate: TranslateService) {}

  public handlerChange(event: Event): void {
    const language = (event.target as HTMLSelectElement).value;
    localStorage.setItem('language', language);
    this.translate.use(language);
  }
}
