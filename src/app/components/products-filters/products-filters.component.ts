import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoriesState } from '../../store/categories/categories.state';
import { CategoryConvertPipe } from '../../pipes/category-convert/category-convert.pipe';
import { TitleCasePipe } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-filters',
  imports: [CategoryConvertPipe, TitleCasePipe, RouterLink],
  templateUrl: './products-filters.component.html',
  styleUrl: './products-filters.component.scss',
})
export class ProductsFiltersComponent {
  private readonly routerSubscription: Subscription;

  private readonly store: Store = new Store();

  public filtersIsActive: InputSignal<boolean> = input.required<boolean>();

  public toggleFilters: OutputEmitterRef<void> = output<void>();

  public activeCategory: WritableSignal<string> = signal<string>('');

  public readonly categories: Signal<string[]> = this.store.selectSignal(
    CategoriesState.getCategories
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.setActiveCategory();
    this.routerSubscription = this.router.events.subscribe((): void =>
      this.setActiveCategory()
    );
  }

  private setActiveCategory(): void {
    const url: UrlSegment[] = this.route.snapshot.url;
    const endpoint: string = url[url.length - 1].path;
    this.activeCategory.set(endpoint);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
