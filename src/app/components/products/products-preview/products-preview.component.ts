import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { PreviewProductsData } from '../../../interfaces/preview-products-data';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductData } from '../../../interfaces/product-data';
import { UpperCasePipe } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ButtonData } from '../../../interfaces/button-data';

@Component({
  selector: 'app-products-preview',
  templateUrl: './products-preview.component.html',
  styleUrl: './products-preview.component.scss',
  imports: [ProductCardComponent, UpperCasePipe, ButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsPreviewComponent {
  private router: Router = new Router();
  public title: InputSignal<string> = input.required<string>();
  public hrefToAll: InputSignal<string> = input.required<string>();
  public products: InputSignal<ProductData[]> = input.required<ProductData[]>();
  public viewAllButtonData: WritableSignal<ButtonData> = signal<ButtonData>({
    text: 'View All',
    color: 'border-white',
  });

  constructor(private readonly translate: TranslateService) {
    translate.get('HOME.VIEW_ALL').subscribe((text: string): void => {
      this.viewAllButtonData.set({
        text,
        color: 'border-white',
      });
    });
  }

  public viewAll(): void {
    this.router.navigate(['shop', this.hrefToAll()]);
  }
}
