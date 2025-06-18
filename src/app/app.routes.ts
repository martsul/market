import { Routes } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { AuthComponent } from './modules/auth/auth.component';
import { isAuthGuard } from './guards/is-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () =>
          import('./modules/home-page/home-page.component').then(
            (m) => m.HomePageComponent
          ),
      },
      {
        path: 'shop',
        title: 'Shop',
        loadComponent: () =>
          import('./modules/shop-page/shop-page.component').then(
            (m) => m.ShopPageComponent
          ),
      },
      {
        path: 'shop/:category',
        title: 'Shop',
        loadComponent: () =>
          import('./modules/shop-page/shop-page.component').then(
            (m) => m.ShopPageComponent
          ),
      },
      {
        path: 'shop/:category/:productId',
        loadComponent: () =>
          import('./modules/product-page/product-page.component').then(
            (m) => m.ProductPageComponent
          ),
      },
      { path: 'auth', title: 'Auth', component: AuthComponent },
      {
        path: 'profile',
        title: 'Profile',
        // canActivate: [isAuthGuard],
        loadComponent: () =>
          import('./modules/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
    ],
  },
];
