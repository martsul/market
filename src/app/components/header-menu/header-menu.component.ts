import { Component, Signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { CategoriesState } from '../../store/categories/categories.state';
import { RouterLink } from '@angular/router';
import { CategoryConvertPipe } from '../../pipes/category-convert.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header-menu',
  imports: [MatMenuModule, RouterLink, CategoryConvertPipe, TitleCasePipe],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
})
export class HeaderMenuComponent {
  public readonly categories: Signal<string[]>;

  constructor(private readonly store: Store) {
    this.categories = this.store.selectSignal(CategoriesState.getCategories);
  }
}
