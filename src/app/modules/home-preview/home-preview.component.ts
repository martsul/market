import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { HOME_PREVIEW_STATISTIC } from '../../constants/home-preview-statistic';
import { ConvertResultStatisticPipe } from '../../pipes/convert-result-statistic/convert-result-statistic.pipe';
import { ItemResultStatistic } from '../../interfaces/item-result-statistic';

@Component({
  selector: 'app-home-preview',
  imports: [ButtonComponent, ConvertResultStatisticPipe],
  templateUrl: './home-preview.component.html',
  styleUrl: './home-preview.component.scss',
})
export class HomePreviewComponent {
  public statisticItems:ItemResultStatistic[] = HOME_PREVIEW_STATISTIC;
}
