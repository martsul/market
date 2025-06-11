import { Component } from '@angular/core';
import { ProductsFiltersComponent } from '../../components/products-filters/products-filters.component';
import { ProductsHeadComponent } from '../../components/products-head/products-head.component';
import { ProductsCardsComponent } from '../../components/products-cards/products-cards.component';
import { ProductsPaginationComponent } from '../../components/products-pagination/products-pagination.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-products-landing',
  imports: [
    ProductsFiltersComponent,
    ProductsHeadComponent,
    ProductsCardsComponent,
    ProductsPaginationComponent,
  ],
  templateUrl: './products-landing.component.html',
  styleUrl: './products-landing.component.scss',
})
export class ProductsLandingComponent {}
