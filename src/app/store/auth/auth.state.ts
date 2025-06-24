import { ApiService } from './../../services/api/api.service';
import { UserData } from './../../types/user-data';
import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetAuthDataAction, LogInAction, LogOutAction } from './auth.actions';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export interface AuthStateModel {
  status: 'idle' | 'auth' | 'noAuth';
  userData: UserData | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    status: 'idle',
    userData: null,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private readonly cookieService: CookieService,
    private readonly apiService: ApiService
  ) {}

  @Selector()
  static getState(state: AuthStateModel): AuthStateModel {
    return state;
  }

  @Action(GetAuthDataAction)
  getAuthData(ctx: StateContext<AuthStateModel>) {
    return this.apiService.getAuthData().pipe(
      tap((userData) => {
        ctx.patchState({ status: 'auth', userData });
      }),
      catchError(() => {
        ctx.patchState({ status: 'noAuth', userData: null });
        return EMPTY;
      })
    );
  }

  @Action(LogInAction)
  logIn(ctx: StateContext<AuthStateModel>, { payload }: LogInAction) {
    return this.apiService.login(payload).pipe(
      tap(
        (v) => {
          const { accessToken, refreshToken, ...userData } = v;
          this.cookieService.set('accessToken', accessToken);
          this.cookieService.set('refreshToken', refreshToken);
          ctx.patchState({ userData, status: 'auth' });
        },
        catchError((e: unknown) => {
          ctx.patchState({ status: 'noAuth', userData: null });
          return throwError(() => e);
        })
      )
    );
  }

  @Action(LogOutAction)
  logOut(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ status: 'noAuth', userData: null });
  }
}
