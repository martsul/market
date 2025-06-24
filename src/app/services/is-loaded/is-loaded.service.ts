import { computed, Injectable, signal, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoriesState } from '../../store/categories/categories.state';
import { RequestStatus } from '../../types/request-status';
import { ProductsState } from '../../store/products/products.state';
import { ProductState } from '../../types/product-state';

@Injectable({
  providedIn: 'root',
})
export class IsLoadedService {
  private readonly categories: Signal<string[]> = this.store.selectSignal(
    CategoriesState.getCategories
  );
  private readonly productsStatus: Signal<RequestStatus> =
    this.store.selectSignal(ProductsState.getProductsStatus);
  private readonly shopPageIsLoaded: Signal<boolean> = computed((): boolean => {
    return Boolean(
      this.categories().length && this.productsStatus() === 'fulfilled'
    );
  });

  private readonly product: Signal<ProductState> = this.store.selectSignal(
    ProductsState.getProduct
  );
  private readonly productPageIsLoaded: Signal<boolean> = computed<boolean>(
    () => {
      return this.product().requestStatus === 'fulfilled';
    }
  );

  constructor(private readonly store: Store) {}

  public getShopPageIsLoaded(): Signal<boolean> {
    return this.shopPageIsLoaded;
  }

  public getProductPageIsLoaded(): Signal<boolean> {
    return this.productPageIsLoaded;
  }
}
