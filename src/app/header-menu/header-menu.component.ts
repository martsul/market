import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { CategoriesState } from '../store/categories/categories.state';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-header-menu',
  imports: [MatMenuModule, AsyncPipe, JsonPipe],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
})
export class HeaderMenuComponent {
  private readonly store = new Store();
  public categories = this.store.select(CategoriesState.getCategories)

  constructor () {
    const a = this.store.select(CategoriesState.getCategories).subscribe(v => v.subscribe(console.log))
  }
}
