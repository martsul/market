import { Component, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsPreviewComponent } from '../../../components/products/products-preview/products-preview.component';
import { QueryWomenPreviewAction } from '../../../store/products/products.actions';
import { ProductData } from '../../../interfaces/product-data';
import { ProductsState } from '../../../store/products/products.state';

@Component({
  selector: 'app-women-preview',
  imports: [ProductsPreviewComponent],
  templateUrl: './women-preview.component.html',
  styleUrl: './women-preview.component.scss',
})
export class WomenPreviewComponent {
  private readonly store: Store = new Store();
  constructor() {
    this.store.dispatch(new QueryWomenPreviewAction());
  }

  public products: Signal<ProductData[]> = this.store.selectSignal(
    ProductsState.getWomenPreview
  );
}
