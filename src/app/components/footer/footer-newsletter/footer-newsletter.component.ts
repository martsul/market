import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { ButtonComponent } from '../../button/button.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { InputData } from '../../../interfaces/input-data';
import { ButtonData } from '../../../interfaces/button-data';
import { TranslateResponse } from './interfaces/translate-response';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-newsletter',
  imports: [InputComponent, ButtonComponent, TranslatePipe],
  templateUrl: './footer-newsletter.component.html',
  styleUrl: './footer-newsletter.component.scss',
})
export class FooterNewsletterComponent {
  public emailInputData: WritableSignal<InputData> = signal<InputData>({
    placeholder: '',
    icon: 'email',
    color: 'white',
    type: 'email',
  });
  public emailButtonData: WritableSignal<ButtonData> = signal<ButtonData>({
    text: '',
    color: 'white',
  });

  constructor(private readonly translate: TranslateService) {
    this.translate.onLangChange.subscribe(() => {
      this.updateTranslate();
    });

    this.updateTranslate();
  }

  private updateTranslate() {
    this.translate
      .get(['FOOTER.NEWSLETTER.INPUT', 'FOOTER.NEWSLETTER.BUTTON'])
      .subscribe((v: TranslateResponse): void => {
        console.log(123123123);
        this.updateInputData(v['FOOTER.NEWSLETTER.INPUT']);
        this.updateButtonData(v['FOOTER.NEWSLETTER.BUTTON']);
      });
  }

  private updateButtonData(text: string): void {
    this.emailButtonData.set({
      text,
      color: 'white',
    });
  }

  private updateInputData(placeholder: string): void {
    this.emailInputData.set({
      placeholder,
      icon: 'email',
      color: 'white',
      type: 'email',
    });
  }
}
