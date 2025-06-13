import { Component, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsPreviewComponent } from '../../../components/products/products-preview/products-preview.component';
import { QueryMenPreviewAction } from '../../../store/products/products.actions';
import { ProductData } from '../../../interfaces/product-data';
import { ProductsState } from '../../../store/products/products.state';

@Component({
  selector: 'app-men-preview',
  imports: [ProductsPreviewComponent],
  templateUrl: './men-preview.component.html',
  styleUrl: './men-preview.component.scss',
})
export class MenPreviewComponent {
  private readonly store: Store = new Store();

  constructor() {
    this.store.dispatch(new QueryMenPreviewAction());
  }

  public products: Signal<ProductData[]> = this.store.selectSignal(
    ProductsState.getMenPreview
  );
}
