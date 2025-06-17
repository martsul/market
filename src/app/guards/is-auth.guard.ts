import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState, AuthStateModel } from '../store/auth/auth.state';
import { Signal } from '@angular/core';

export const isAuthGuard: CanActivateFn = () => {
  const store: Store = new Store();
  const router: Router = new Router();
  const authState: Signal<AuthStateModel> = store.selectSignal(
    AuthState.getState
  );

  if (authState().status === 'auth') {
    return true;
  } else {
    return router.createUrlTree(['/auth']);
  }
};
