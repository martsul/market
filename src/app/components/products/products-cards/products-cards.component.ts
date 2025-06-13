import { Component, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductData } from '../../../interfaces/product-data';
import { ProductsState } from '../../../store/products/products.state';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products-cards',
  imports: [ProductCardComponent],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.scss',
})
export class ProductsCardsComponent {
  private readonly store: Store = new Store();
  public products: Signal<ProductData[]> = this.store.selectSignal(
    ProductsState.getProducts
  );
}
