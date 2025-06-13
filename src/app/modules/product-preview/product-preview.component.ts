import { filter, Subscription } from 'rxjs';
import { Component, Signal } from '@angular/core';
import { ProductImagesComponent } from '../../components/product-images/product-images.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { ProductPriceComponent } from '../../components/product-price/product-price.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CountButtonComponent } from '../../components/count-button/count-button.component';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { QueryProductAction } from '../../store/products/products.actions';
import { ProductsState } from '../../store/products/products.state';
import { ProductState } from '../../types/product-state';

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
  private readonly routerSubscription: Subscription;
  private readonly store: Store = new Store();
  public product: Signal<ProductState> = this.store.selectSignal<ProductState>(
    ProductsState.getProduct
  );

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.queryProduct();
    this.routerSubscription = this.router.events
      .pipe(
        filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.queryProduct();
      });
  }

  private queryProduct(): void {
    const { id } = this.route.snapshot.queryParams as { id: string };
    this.store.dispatch(new QueryProductAction({ id: +id }));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
