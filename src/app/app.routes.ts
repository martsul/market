import { ProfileComponent } from './modules/profile/profile.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { ShopPageComponent } from './modules/shop-page/shop-page.component';
import { ProductPageComponent } from './modules/product-page/product-page.component';
import { AuthComponent } from './modules/auth/auth.component';
import { isAuthGuard } from './guards/is-auth.guard';

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
        path: 'shop/:category',
        component: ShopPageComponent,
        title: 'Shop',
      },
      {
        path: 'shop/:category/:product',
        component: ProductPageComponent,
      },
      { path: 'auth', title: 'Auth', component: AuthComponent },
      { path: 'profile', title: 'Profile', component: ProfileComponent
        // , canActivate: [isAuthGuard]
       },
    ],
  },
];
