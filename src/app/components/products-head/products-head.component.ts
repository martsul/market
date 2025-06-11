import { Component, signal, WritableSignal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CategoryConvertPipe } from '../../pipes/category-convert/category-convert.pipe';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-head',
  imports: [MatMenuModule, CategoryConvertPipe, TitleCasePipe],
  templateUrl: './products-head.component.html',
  styleUrl: './products-head.component.scss',
})
export class ProductsHeadComponent {
  private readonly routerSubscription: Subscription;
  public currentShowingProducts: string = '1-10';
  public allProducts: number = 100;
  public sortByField: WritableSignal<string> = signal<string>('Most expensive');
  public title: string = '';

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.setTitle();
    this.routerSubscription = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((): void => {
        this.setTitle();
      });
  }

  public setTitle(): void {
    const url: UrlSegment[] = this.route.snapshot.url;
    const endpoint: UrlSegment = url[url.length - 1];
    this.title = endpoint.path;
  }

  public changeSortBy(field: string): void {
    this.sortByField.set(field);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
