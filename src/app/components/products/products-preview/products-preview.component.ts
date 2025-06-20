import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { PreviewProductsData } from '../../../interfaces/preview-products-data';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductData } from '../../../interfaces/product-data';
import { UpperCasePipe } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-preview',
  templateUrl: './products-preview.component.html',
  styleUrl: './products-preview.component.scss',
  imports: [ProductCardComponent, UpperCasePipe, ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsPreviewComponent {
  private router: Router = new Router();
  public data: InputSignal<PreviewProductsData> =
    input.required<PreviewProductsData>();

  public viewAll(): void {
    this.router.navigate(['shop', this.data().hrefToAll]);
  }

  get products(): ProductData[] {
    return this.data().products;
  }

  get title(): string {
    return this.data().title;
  }
}
