import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsPreviewComponent } from '../../../components/products/products-preview/products-preview.component';
import { QueryWomenPreviewAction } from '../../../store/products/products.actions';
import { ProductData } from '../../../interfaces/product-data';
import { ProductsState } from '../../../store/products/products.state';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-women-preview',
  imports: [ProductsPreviewComponent],
  templateUrl: './women-preview.component.html',
  styleUrl: './women-preview.component.scss',
})
export class WomenPreviewComponent {
  private readonly store: Store = new Store();
  public title: WritableSignal<string> = signal<string>('');

  constructor(private readonly translate: TranslateService) {
    this.store.dispatch(new QueryWomenPreviewAction());
    this.translate.get('HOME.WOMEN.TITLE').subscribe((v: string): void => {
      this.title.set(v);
    });
  }

  public products: Signal<ProductData[]> = this.store.selectSignal(
    ProductsState.getWomenPreview
  );
}
