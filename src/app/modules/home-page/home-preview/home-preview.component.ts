import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { HOME_PREVIEW_STATISTIC } from '../../../constants/home-preview-statistic';
import { ItemResultStatistic } from '../../../interfaces/item-result-statistic';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-preview',
  imports: [ButtonComponent, DecimalPipe, TranslatePipe],
  templateUrl: './home-preview.component.html',
  styleUrl: './home-preview.component.scss',
})
export class HomePreviewComponent {
  public statisticItems: ItemResultStatistic[] = HOME_PREVIEW_STATISTIC;

  constructor(private readonly router: Router) {}

  public handlerShopNow(): void {
    this.router.navigate(['shop']);
  }
}
