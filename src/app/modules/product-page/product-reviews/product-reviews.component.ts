import { Component, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsState } from '../../../store/products/products.state';
import { ProductReviewComponent } from '../../../components/products/product-review/product-review.component';
import { IsLoadedService } from '../../../services/is-loaded/is-loaded.service';
import { ProductReview } from '../../../interfaces/product-review';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-product-reviews',
  imports: [ProductReviewComponent, NgxSkeletonLoaderModule],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss',
})
export class ProductReviewsComponent {
  public reviews: Signal<ProductReview[] | undefined> = this.store.selectSignal(
    ProductsState.getReviews
  );
  public isLoaded: Signal<boolean> =
    this.isLoadedService.getProductPageIsLoaded();

  constructor(
    private readonly store: Store,
    private readonly isLoadedService: IsLoadedService
  ) {}
}
