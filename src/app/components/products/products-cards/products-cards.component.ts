import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductData } from '../../../interfaces/product-data';
import { ProductsState } from '../../../store/products/products.state';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { IsLoadedService } from '../../../services/is-loaded/is-loaded.service';

@Component({
  selector: 'app-products-cards',
  imports: [ProductCardComponent, NgxSkeletonLoaderModule],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.scss',
})
export class ProductsCardsComponent {
  public products: Signal<ProductData[]> = this.store.selectSignal(
    ProductsState.getProducts
  );
  public isLoaded: Signal<boolean> = this.isLoadedService.getShopPageIsLoaded()

  constructor(private readonly store: Store, private readonly isLoadedService: IsLoadedService) {}
}
