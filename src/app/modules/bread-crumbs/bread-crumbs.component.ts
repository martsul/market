import { CategoryConvertPipe } from './../../pipes/category-convert/category-convert.pipe';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { BreadCrumbData } from '../../interfaces/bread-crumb-data';
import { TitleCasePipe } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-bread-crumbs',
  imports: [RouterLink, TitleCasePipe, CategoryConvertPipe],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.scss',
})
export class BreadCrumbsComponent {
  private readonly routerSubscription: Subscription;
  public breadCrumbs: BreadCrumbData[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
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
    this.route.snapshot.url.forEach(({ path }) => {
      const prevPath = this.breadCrumbs[this.breadCrumbs.length - 1].path;
      this.breadCrumbs.push({ path: `${prevPath}/${path}`, title: path });
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
