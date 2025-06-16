import { UserData } from './../../types/user-data';
import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LogInAction } from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
export interface AuthStateModel {
  status: 'auth' | 'no auth' | 'error';
  userData: UserData | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    status: 'no auth',
    userData: null,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private readonly cookieService: CookieService,
    private readonly authService: AuthService
  ) {}

  @Selector()
  static getState(state: AuthStateModel) {
    return state;
  }

  @Action(LogInAction)
  add(ctx: StateContext<AuthStateModel>, { payload }: LogInAction) {
    return this.authService.login(payload).pipe(
      tap(
        (v) => {
          const { accessToken, refreshToken, ...userData } = v;
          this.cookieService.set('accessToken', accessToken);
          this.cookieService.set('refreshToken', refreshToken);
          ctx.patchState({ userData, status: 'auth' });
        },
        catchError((e: unknown) => {
          ctx.patchState({ status: 'error', userData: null });
          return throwError(() => e);
        })
      )
    );
  }
}
