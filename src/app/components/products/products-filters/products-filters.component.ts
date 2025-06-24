import {
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { CategoriesState } from '../../../store/categories/categories.state';
import { CategoryConvertPipe } from '../../../pipes/category-convert/category-convert.pipe';
import { TitleCasePipe } from '@angular/common';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Router,
  RouterLink,
  UrlSegment,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { IsLoadedService } from '../../../services/is-loaded/is-loaded.service';

@Component({
  selector: 'app-products-filters',
  imports: [
    CategoryConvertPipe,
    TitleCasePipe,
    RouterLink,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './products-filters.component.html',
  styleUrl: './products-filters.component.scss',
})
export class ProductsFiltersComponent {
  private readonly routerSubscription: Subscription;

  private readonly store: Store = new Store();

  public readonly categories: Signal<string[]> = this.store.selectSignal(
    CategoriesState.getCategories
  );

  public filtersIsActive: InputSignal<boolean> = input.required<boolean>();

  public toggleFilters: OutputEmitterRef<void> = output<void>();

  public activeCategory: WritableSignal<string> = signal<string>('');

  public isLoaded: Signal<boolean> = this.isLoadedService.getShopPageIsLoaded();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly isLoadedService: IsLoadedService
  ) {
    this.setActiveCategory();
    this.routerSubscription = this.router.events
      .pipe(
        filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe((): void => this.setActiveCategory());
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
