import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { homePreviewStatistic } from '../../constants/home-preview-statistic';
import { ConvertResultStatisticPipe } from '../../pipes/convert-result-statistic/convert-result-statistic.pipe';

@Component({
  selector: 'app-home-preview',
  imports: [ButtonComponent, ConvertResultStatisticPipe],
  templateUrl: './home-preview.component.html',
  styleUrl: './home-preview.component.scss',
})
export class HomePreviewComponent {
  public statisticItems = homePreviewStatistic;
}
