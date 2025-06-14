import {
  Component,
  computed,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CategoryConvertPipe } from '../../../pipes/category-convert/category-convert.pipe';
import { TitleCasePipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { ProductsState } from '../../../store/products/products.state';
import { SetSortFiledAction } from '../../../store/products/products.actions';
import { SortTitles } from '../../../types/sort-titles';

@Component({
  selector: 'app-products-head',
  imports: [MatMenuModule, CategoryConvertPipe, TitleCasePipe],
  templateUrl: './products-head.component.html',
  styleUrl: './products-head.component.scss',
})
export class ProductsHeadComponent {
  private readonly routerSubscription: Subscription;

  private readonly page: Signal<number> = this.store.selectSignal(
    ProductsState.getProductsPage
  );

  private readonly productsPerPage: Signal<number> = this.store.selectSignal(
    ProductsState.getProductsPerPage
  );

  public toggleFilters: OutputEmitterRef<void> = output<void>();

  public allProducts: Signal<number> = this.store.selectSignal(
    ProductsState.getProductsTotal
  );

  public sortByField: Signal<SortTitles> = this.store.selectSignal(
    ProductsState.getSortFieldName
  );

  public showing: Signal<string> = computed((): string => {
    const start: number = Math.max(
      1,
      (this.page() - 1) * this.productsPerPage()
    );
    const end: number = Math.min(
      this.allProducts(),
      this.page() * this.productsPerPage()
    );
    return `${start}-${end}`;
  });

  public requeryProducts: OutputEmitterRef<void> = output<void>();

  public title: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {
    this.setTitle();
    this.routerSubscription = this.router.events
      .pipe(
        filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
      )
      .subscribe((): void => {
        this.setTitle();
      });
  }

  public setTitle(): void {
    const url: UrlSegment[] = this.route.snapshot.url;
    const endpoint: UrlSegment = url[url.length - 1];
    this.title = endpoint.path;
  }

  public changeSortBy(field: SortTitles): void {
    this.store.dispatch(new SetSortFiledAction({ sort: field }));
    this.requeryProducts.emit();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
