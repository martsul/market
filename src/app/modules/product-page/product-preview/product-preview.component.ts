import { Component, effect, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductImagesComponent } from '../../../components/products/product-images/product-images.component';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';
import { ProductPriceComponent } from '../../../components/products/product-price/product-price.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { CountButtonComponent } from '../../../components/count-button/count-button.component';
import { ProductState } from '../../../types/product-state';
import { ProductsState } from '../../../store/products/products.state';
import { IsLoadedService } from '../../../services/is-loaded/is-loaded.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-product-preview',
  imports: [
    ProductImagesComponent,
    StarRatingComponent,
    ProductPriceComponent,
    ButtonComponent,
    CountButtonComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './product-preview.component.html',
  styleUrl: './product-preview.component.scss',
})
export class ProductPreviewComponent {
  public product: Signal<ProductState> = this.store.selectSignal<ProductState>(
    ProductsState.getProduct
  );
  public isLoaded: Signal<boolean> =
    this.isLoadedService.getProductPageIsLoaded();

  constructor(
    private readonly store: Store,
    private readonly isLoadedService: IsLoadedService
  ) {
    effect(() => {
      console.log(this.isLoaded())
    })
  }
}
