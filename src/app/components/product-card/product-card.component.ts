import { Component, input, InputSignal, Signal } from '@angular/core';
import { ProductData } from '../../interfaces/product-data';
import { NgOptimizedImage } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, StarRatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  public product: InputSignal<ProductData> = input.required<ProductData>();

  get thumbnail(): string {
    return this.product().thumbnail;
  }

  get title(): string {
    return this.product().title;
  }

  get price(): number {
    return this.product().price;
  }

  get rating(): number {
    return this.product().rating;
  }

  get ratingPercents(): number {
    return (this.rating * 100) / 5;
  }

  get discount(): number | undefined {
    return this.product().discountPercentage;
  }

  get startPrice(): string | undefined {
    if (this.discount) {
      return Math.ceil((100 * this.price) / (100 - this.discount)).toFixed(2);
    }
    return undefined;
  }
}
