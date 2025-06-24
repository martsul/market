import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { HeaderMenuComponent } from '../../../components/header/header-menu/header-menu.component';
import { SearchComponent } from '../../../components/search/search.component';
import { HeaderUserComponent } from '../../../components/header/header-user/header-user.component';
import { QueryCategoriesAction } from '../../../store/categories/categories.actions';
import { GetAuthDataAction } from '../../../store/auth/auth.actions';
import { AuthState } from '../../../store/auth/auth.state';

@Component({
  selector: 'app-header',
  imports: [
    HeaderMenuComponent,
    SearchComponent,
    HeaderUserComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authData = this.store.selectSignal(AuthState.getState);

  constructor(private readonly store: Store) {
    this.store.dispatch(new QueryCategoriesAction());
    if (this.authData().status === 'idle') {
      this.store.dispatch(new GetAuthDataAction());
    }
  }

  public menuIsOpen: boolean = false;
  public toggleMenuOpen(): void {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
