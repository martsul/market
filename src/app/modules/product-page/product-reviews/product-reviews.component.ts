import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsState } from '../../../store/products/products.state';
import { ProductReviewComponent } from '../../../components/products/product-review/product-review.component';

@Component({
  selector: 'app-product-reviews',
  imports: [ProductReviewComponent],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss',
})
export class ProductReviewsComponent {
  public reviews = this.store.selectSignal(ProductsState.getReviews)

  constructor(private readonly store: Store) {}
}
