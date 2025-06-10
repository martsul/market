import { Component } from '@angular/core';
import { ProductsPreviewComponent } from '../../components/products-preview/products-preview.component';
import { Store } from '@ngxs/store';
import { QueryWomenPreview } from '../../store/products/products.actions';
import { ProductsState } from '../../store/products/products.state';

@Component({
  selector: 'app-women-preview',
  imports: [ProductsPreviewComponent],
  templateUrl: './women-preview.component.html',
  styleUrl: './women-preview.component.scss',
})
export class WomenPreviewComponent {
  private readonly store: Store = new Store();
  constructor() {
    this.store.dispatch(new QueryWomenPreview());
  }

  public products = this.store.selectSignal(ProductsState.getWomenPreview);
}
