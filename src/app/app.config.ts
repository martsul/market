import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { CategoriesState } from './store/categories/categories.state';
import { ProductsState } from './store/products/products.state';
import { AuthState } from './store/auth/auth.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([CategoriesState, ProductsState, AuthState]),
    provideHttpClient(),
  ],
};
