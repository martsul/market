import { Component, input, Signal } from '@angular/core';
import { ProductData } from '../../interfaces/product-data';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  public product = input.required<ProductData>();

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
}
