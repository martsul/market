import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { ProductReview } from '../../../interfaces/product-review';
import { StarRatingComponent } from '../../star-rating/star-rating.component';

@Component({
  selector: 'app-product-review',
  imports: [StarRatingComponent],
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.scss',
})
export class ProductReviewComponent {
  public review: InputSignal<ProductReview> = input.required<ProductReview>();
  public date: Signal<string> = computed<string>((): string => {
    const date: Date = new Date(this.review().date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  });
}
