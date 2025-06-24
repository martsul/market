import { computed, Injectable, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoriesState } from '../../store/categories/categories.state';
import { RequestStatus } from '../../types/request-status';
import { ProductsState } from '../../store/products/products.state';

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

  constructor(private readonly store: Store) {}

  public getShopPageIsLoaded(): Signal<boolean> {
    return this.shopPageIsLoaded
  }
}
