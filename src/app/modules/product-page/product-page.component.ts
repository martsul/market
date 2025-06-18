import { Component, Signal } from '@angular/core';
import { BreadCrumbsComponent } from '../../modules/bread-crumbs/bread-crumbs.component';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { Store } from '@ngxs/store';
import { ProductsState } from '../../store/products/products.state';
import { ProductState } from '../../types/product-state';
import { ActivatedRoute } from '@angular/router';
import { QueryProductAction } from '../../store/products/products.actions';

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
export class ProductPageComponent {
  public product: Signal<ProductState> = this.store.selectSignal(
    ProductsState.getProduct
  );

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {
    this.queryProduct()
  }

  private queryProduct(): void {
    const id: string = this.route.snapshot.paramMap.get('productId') as string;
    this.store.dispatch(new QueryProductAction({ id: +id }));
  }
}
