import { Component } from '@angular/core';
import { HeaderMenuComponent } from '../../header-menu/header-menu.component';
import { SearchComponent } from '../../search/search.component';
import { HeaderUserLinksComponent } from '../../header-user-links/header-user-links.component';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { QueryCategoriesAction } from '../../store/categories/categories.actions';

@Component({
  selector: 'app-header',
  imports: [
    HeaderMenuComponent,
    SearchComponent,
    HeaderUserLinksComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private readonly store: Store) {
    this.store.dispatch(new QueryCategoriesAction());
  }
}
