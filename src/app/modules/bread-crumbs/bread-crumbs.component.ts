import { CategoryConvertPipe } from './../../pipes/category-convert/category-convert.pipe';
import { Component, Signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { BreadCrumbData } from '../../interfaces/bread-crumb-data';
import { TitleCasePipe } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { ProductsState } from '../../store/products/products.state';
import { ProductState } from '../../types/product-state';

@Component({
  selector: 'app-bread-crumbs',
  imports: [RouterLink, TitleCasePipe, CategoryConvertPipe],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.scss',
})
export class BreadCrumbsComponent {
  private readonly routerSubscription: Subscription;
  public breadCrumbs: BreadCrumbData[] = [];
  private product: Signal<ProductState> = this.store.selectSignal(
    ProductsState.getProduct
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.handlerRouter();
    this.routerSubscription = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((): void => {
        this.handlerRouter();
      });
  }

  private handlerRouter(): void {
    this.breadCrumbs = [{ path: '', title: 'home' }];
    const url = this.route.snapshot.url;
    const productId = this.route.snapshot.paramMap.get('productId');
    url.forEach(({ path }, i): void => {
      const prevPath = this.breadCrumbs[this.breadCrumbs.length - 1].path;
      console.log(productId && i === url.length - 1, this.product())
      if (productId && i === url.length - 1) {
        this.breadCrumbs.push({
          path: `${prevPath}/${path}`,
          title: this.product().product?.title || "",
        });
      } else {
        this.breadCrumbs.push({ path: `${prevPath}/${path}`, title: path });
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
