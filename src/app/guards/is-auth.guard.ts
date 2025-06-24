import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState, AuthStateModel } from '../store/auth/auth.state';
import { inject, Signal } from '@angular/core';
import { GetAuthDataAction } from '../store/auth/auth.actions';
import { map, switchMap } from 'rxjs';

export const isAuthGuard: CanActivateFn = () => {
  const store: Store = inject(Store);
  const router: Router = inject(Router);
  const authState: Signal<AuthStateModel> = store.selectSignal(
    AuthState.getState
  );

  if (authState().status === 'idle') {
    return store.dispatch(new GetAuthDataAction()).pipe(
      switchMap(() => store.selectOnce(AuthState.getState)),
      map((auth) => {
        if (auth.status === 'auth') {
          return true;
        } else {
          return router.createUrlTree(['/auth']);
        }
      })
    );
  } else if (authState().status === 'auth') {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }
};
