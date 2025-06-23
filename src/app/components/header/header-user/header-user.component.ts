import { CookieService } from 'ngx-cookie-service';
import { Component, Signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState, AuthStateModel } from '../../../store/auth/auth.state';
import { LogOutAction } from '../../../store/auth/auth.actions';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header-user',
  imports: [MatMenuModule, RouterLink, TranslatePipe],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss',
})
export class HeaderUserComponent {
  public authState: Signal<AuthStateModel> = this.store.selectSignal(
    AuthState.getState
  );

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) {}

  public logout() {
    this.cookieService.deleteAll();
    this.store.dispatch(new LogOutAction());
    this.router.navigate(['']);
  }
}
