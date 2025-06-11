import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '../../modules/bread-crumbs/bread-crumbs.component';

@Component({
  selector: 'app-shop-page',
  imports: [BreadCrumbsComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.scss',
})
export class ShopPageComponent {}
