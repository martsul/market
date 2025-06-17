import { ApiService } from './../../services/api/api.service';
import { UserData } from './../../types/user-data';
import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetAuthDataAction, LogInAction, LogOutAction } from './auth.actions';
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
    userData: {
      id: 1,
      username: 'emilys',
      email: 'emily.johnson@x.dummyjson.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      gender: 'female',
      image: 'https://dummyjson.com/icon/emilys/128',
    },
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
      catchError((e) => {
        ctx.patchState({ status: 'error', userData: null });
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
          ctx.patchState({ status: 'error', userData: null });
          return throwError(() => e);
        })
      )
    );
  }

  @Action(LogOutAction)
  logOut(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ status: 'no auth', userData: null });
  }
}
