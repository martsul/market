import { Component, signal } from '@angular/core';
import { HeaderMenuComponent } from '../../components/header-menu/header-menu.component';
import { SearchComponent } from '../../components/search/search.component';
import { HeaderUserComponent } from '../../components/header-user/header-user.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { QueryCategoriesAction } from '../../store/categories/categories.actions';

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
  constructor(private readonly store: Store) {
    this.store.dispatch(new QueryCategoriesAction());
  }

  public menuIsOpen: boolean = false;
  public toggleMenuOpen(): void {
    this.menuIsOpen = !this.menuIsOpen;
  }
}
