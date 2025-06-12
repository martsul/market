import { Component, Signal } from '@angular/core';
import { ProductsPreviewComponent } from '../../components/products-preview/products-preview.component';
import { Store } from '@ngxs/store';
import { QueryWomenPreviewAction } from '../../store/products/products.actions';
import { ProductsState } from '../../store/products/products.state';
import { ProductData } from '../../interfaces/product-data';
import { Router } from '@angular/router';

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
