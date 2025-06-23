import {
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {
  catchError,
  EMPTY,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ApiService } from '../services/api/api.service';

let isRefreshQuery: boolean = false;

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<unknown>> => {
  const cookieService: CookieService = inject(CookieService);
  const apiService: ApiService = inject(ApiService);
  const accessToken: string = cookieService.get('accessToken');

  const reqClone: HttpRequest<unknown> = req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` },
  });

  return next(reqClone).pipe(
    catchError((error) => {
      if (error.status === 401 && !isRefreshQuery) {
        isRefreshQuery = true;
        return apiService.refreshTokens().pipe(
          switchMap((v) => {
            cookieService.set('accessToken', v.accessToken);
            cookieService.set('refreshToken', v.refreshToken);
            const reqClone: HttpRequest<unknown> = req.clone({
              setHeaders: {
                Authorization: `Bearer ${cookieService.get('accessToken')}`,
              },
            });
            return next(reqClone);
          })
        );
      }
      return throwError(error);
    })
  );
};
