import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProductsPreviewComponent } from '../../../components/products/products-preview/products-preview.component';
import { QueryMenPreviewAction } from '../../../store/products/products.actions';
import { ProductData } from '../../../interfaces/product-data';
import { ProductsState } from '../../../store/products/products.state';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-men-preview',
  imports: [ProductsPreviewComponent],
  templateUrl: './men-preview.component.html',
  styleUrl: './men-preview.component.scss',
})
export class MenPreviewComponent {
  private readonly store: Store = new Store();
  public title: WritableSignal<string> = signal<string>('');

  constructor(private readonly translate: TranslateService) {
    this.store.dispatch(new QueryMenPreviewAction());
    this.translate.get('HOME.MEN.TITLE').subscribe((v: string): void => {
      this.title.set(v);
    });
  }

  public products: Signal<ProductData[]> = this.store.selectSignal(
    ProductsState.getMenPreview
  );
}
