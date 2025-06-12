import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { ProductData } from '../../interfaces/product-data';
import { NgOptimizedImage } from '@angular/common';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RouterLink } from '@angular/router';
import { ProductPriceComponent } from '../product-price/product-price.component';

@Component({
  selector: 'app-product-card',
  imports: [NgOptimizedImage, StarRatingComponent, RouterLink, ProductPriceComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  public product: InputSignal<ProductData> = input.required<ProductData>();
  public priority: InputSignal<boolean> = input<boolean>(false);

  public ratingPercents: Signal<number> = computed<number>((): number => {
    return (this.product().rating * 100) / 5;
  });
}
