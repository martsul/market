import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '../../modules/bread-crumbs/bread-crumbs.component';
import { ProductsLandingComponent } from './products-landing/products-landing.component';

@Component({
  selector: 'app-shop-page',
    standalone: true,
  imports: [BreadCrumbsComponent, ProductsLandingComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss',
})
export class ShopPageComponent {}
