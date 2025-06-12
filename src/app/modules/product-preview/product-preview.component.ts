import { Component } from '@angular/core';
import { ProductImagesComponent } from '../../components/product-images/product-images.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { ProductPriceComponent } from '../../components/product-price/product-price.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CountButtonComponent } from '../../components/count-button/count-button.component';

@Component({
  selector: 'app-product-preview',
  imports: [
    ProductImagesComponent,
    StarRatingComponent,
    ProductPriceComponent,
    ButtonComponent,
    CountButtonComponent,
  ],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss',
})
export class ProductPreviewComponent {}
