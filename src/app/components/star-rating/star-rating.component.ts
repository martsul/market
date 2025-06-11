import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  public ratingPercents: InputSignal<number> = input.required<number>();
}
