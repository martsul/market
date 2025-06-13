import { Component, signal, WritableSignal } from '@angular/core';
import { ProductsFiltersComponent } from '../../components/products/products-filters/products-filters.component';
import { ProductsHeadComponent } from '../../components/products/products-head/products-head.component';
import { ProductsCardsComponent } from '../../components/products/products-cards/products-cards.component';
import { ProductsPaginationComponent } from '../../components/products/products-pagination/products-pagination.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { Store } from '@ngxs/store';
import {
  QueryProductsAction,
  SetStartPageAction,
} from '../../store/products/products.actions';
import { filter, Subscription } from 'rxjs';
import { ProductsPayload } from '../../interfaces/products-payload';

@Component({
  selector: 'app-products-landing',
  imports: [
    ProductsFiltersComponent,
    ProductsHeadComponent,
    ProductsCardsComponent,
    ProductsPaginationComponent,
  ],
  templateUrl: './products-landing.component.html',
  styleUrl: './products-landing.component.scss',
})
export class ProductsLandingComponent {
  private readonly routerSubscription: Subscription;
  public filtersIsActive: WritableSignal<boolean> = signal<boolean>(false);

  public toggleFilters(): void {
    this.filtersIsActive.set(!this.filtersIsActive());
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {
    this.updateProducts();
    this.routerSubscription = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((): void => {
        this.updateProducts();
      });
  }

  private updateProducts(): void {
    this.store.dispatch(new SetStartPageAction());
    this.queryProducts();
  }

  public queryProducts(): void {
    const queryPayload: ProductsPayload = {};
    const url: UrlSegment[] = this.route.snapshot.url;
    const category: string = url[url.length - 1].path;
    if (category !== 'shop') {
      queryPayload.category = category;
    }
    this.store.dispatch(new QueryProductsAction(queryPayload));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
