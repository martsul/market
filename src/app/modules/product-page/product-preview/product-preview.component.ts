import { Component, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProductImagesComponent } from '../../../components/products/product-images/product-images.component';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';
import { ProductPriceComponent } from '../../../components/products/product-price/product-price.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { CountButtonComponent } from '../../../components/count-button/count-button.component';
import { QueryProductAction } from '../../../store/products/products.actions';
import { ProductState } from '../../../types/product-state';
import { ProductsState } from '../../../store/products/products.state';

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
export class ProductPreviewComponent {
  public product: Signal<ProductState> = this.store.selectSignal<ProductState>(
    ProductsState.getProduct
  );

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {
    this.queryProduct();
  }

  private queryProduct(): void {
    const { id } = this.route.snapshot.queryParams as { id: string };
    this.store.dispatch(new QueryProductAction({ id: +id }));
  }
}
