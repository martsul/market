import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomePageComponent, title: 'Home' },
      {
        path: 'shop',
        component: ShopPageComponent,
        title: 'Shop',
      },
      {
        path: 'shop/:category/:product',
        component: ProductPageComponent,
      },
      {
        path: 'shop/:category',
        component: ShopPageComponent,
        title: 'Shop',
      },
    ],
  },
];
