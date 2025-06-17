import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '../../modules/bread-crumbs/bread-crumbs.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { ProductReviewComponent } from '../../components/products/product-review/product-review.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';

@Component({
  selector: 'app-product-page',
    standalone: true,
  imports: [
    BreadCrumbsComponent,
    ProductPreviewComponent,
    ProductReviewsComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {}
