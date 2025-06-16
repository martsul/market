import { Component, computed, input, InputSignal, Signal } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  public rating: InputSignal<number> = input.required<number>();
  public withNums: InputSignal<boolean> = input<boolean>(true);

  public ratingPercents: Signal<number> = computed<number>((): number => {
    return (this.rating() * 100) / 5;
  });
}
