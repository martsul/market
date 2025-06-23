import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CategoriesState } from './store/categories/categories.state';
import { ProductsState } from './store/products/products.state';
import { AuthState } from './store/auth/auth.state';
import { authInterceptor } from './interceptors/auth.interceptor';
import { CartState } from './store/cart/cart.state';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderFactory } from './translate-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([CategoriesState, ProductsState, AuthState, CartState]),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideTranslateService({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
};
