import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '../../modules/bread-crumbs/bread-crumbs.component';
import { ProductPreviewComponent } from '../../modules/product-preview/product-preview.component';

@Component({
  selector: 'app-product-page',
  imports: [BreadCrumbsComponent, ProductPreviewComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
}
