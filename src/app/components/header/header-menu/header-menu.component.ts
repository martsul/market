import {
  Component,
  input,
  InputSignal,
  Output,
  output,
  OutputEmitterRef,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngxs/store';
import { CategoriesState } from '../../../store/categories/categories.state';
import { RouterLink } from '@angular/router';
import { CategoryConvertPipe } from '../../../pipes/category-convert/category-convert.pipe';
import { TitleCasePipe } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header-menu',
  imports: [MatMenuModule, RouterLink, CategoryConvertPipe, TitleCasePipe, TranslatePipe],
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.scss',
})
export class HeaderMenuComponent {
  public readonly categories: Signal<string[]>;
  public readonly accordionIsOpen: WritableSignal<boolean> =
    signal<boolean>(false);
  public menuIsHidden: WritableSignal<boolean> = signal<boolean>(false);
  public toggleMenuOpen: OutputEmitterRef<void> = output<void>();
  public menuIsOpen: InputSignal<boolean> = input.required<boolean>();

  constructor(
    private readonly store: Store,
    private breakpointObserver: BreakpointObserver
  ) {
    this.categories = this.store.selectSignal(CategoriesState.getCategories);
    this.breakpointObserver
      .observe(['(max-width: 991px)'])
      .subscribe((result): void => {
        this.menuIsHidden.set(result.matches);
      });
  }

  public closeMenu(): void {
    this.toggleMenuOpen.emit();
  }

  public toggleAccordion(): void {
    this.accordionIsOpen.set(!this.accordionIsOpen());
  }
}
