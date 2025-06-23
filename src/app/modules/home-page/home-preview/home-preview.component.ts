import { Component, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { HOME_PREVIEW_STATISTIC } from '../../../constants/home-preview-statistic';
import { ItemResultStatistic } from '../../../interfaces/item-result-statistic';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonData } from '../../../interfaces/button-data';

@Component({
  selector: 'app-home-preview',
  imports: [ButtonComponent, DecimalPipe, TranslatePipe],
  templateUrl: './home-preview.component.html',
  styleUrl: './home-preview.component.scss',
})
export class HomePreviewComponent {
  public statisticItems: ItemResultStatistic[] = HOME_PREVIEW_STATISTIC;
  public shopButtonData: WritableSignal<ButtonData> = signal<ButtonData>({
    color: 'dark',
    text: '',
  });

  constructor(
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.get('HOME.PREVIEW.SHOP').subscribe((text: string): void => {
      this.shopButtonData.set({ color: 'dark', text });
    });
  }

  public handlerShopNow(): void {
    this.router.navigate(['shop']);
  }
}
