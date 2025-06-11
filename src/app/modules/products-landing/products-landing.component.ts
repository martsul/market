import { Component } from '@angular/core';
import { ProductsFiltersComponent } from '../../components/products-filters/products-filters.component';
import { ProductsHeadComponent } from '../../components/products-head/products-head.component';
import { ProductsCardsComponent } from '../../components/products-cards/products-cards.component';
import { ProductsPaginationComponent } from '../../components/products-pagination/products-pagination.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { QueryProducts } from '../../store/products/products.actions';
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

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {
    this.queryProducts();
    this.routerSubscription = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((): void => {
        this.queryProducts();
      });
  }

  public queryProducts(): void {
    const queryPayload: ProductsPayload = {};
    const url: UrlSegment[] = this.route.snapshot.url;
    const category: string = url[url.length - 1].path;
    if (category !== 'shop') {
      queryPayload.category = category;
    }
    this.store.dispatch(new QueryProducts(queryPayload));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
