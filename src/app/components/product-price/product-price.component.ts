import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { ProductPriceData } from '../../interfaces/product-price-data';

@Component({
  selector: 'app-product-price',
  imports: [],
  templateUrl: './product-price.component.html',
  styleUrl: './product-price.component.scss',
})
export class ProductPriceComponent {
  public data: InputSignal<ProductPriceData> =
    input.required<ProductPriceData>();

  public discount: Signal<number | undefined> = computed<number | undefined>(
    (): number | undefined => {
      const discount = this.data().discount;
      return discount ? Math.ceil(discount) : discount;
    }
  );

  public startPrice: Signal<string | undefined> = computed<string | undefined>(
    (): string | undefined => {
      if (this.data().discount) {
        return Math.ceil(
          (100 * this.data().price) / (100 - this.data().discount!)
        ).toFixed(2);
      }
      return undefined;
    }
  );
}
