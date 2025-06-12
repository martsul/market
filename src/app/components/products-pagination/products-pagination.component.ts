import { Component, computed, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsState } from '../../store/products/products.state';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products-pagination',
  imports: [NgxPaginationModule],
  templateUrl: './products-pagination.component.html',
  styleUrl: './products-pagination.component.scss',
})
export class ProductsPaginationComponent {
  private readonly store: Store = new Store();
  public readonly currentPage: Signal<number> = this.store.selectSignal(
    ProductsState.getProductsPage
  );
  public readonly total: Signal<number> = this.store.selectSignal(
    ProductsState.getProductsTotal
  );
  public readonly collection: Signal<undefined[]> = computed(
    (): undefined[] => new Array(this.total())
  );
  public itemsPerPage: Signal<number> = this.store.selectSignal(
    ProductsState.getProductsPerPage
  );
}
