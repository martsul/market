import { CategoryConvertPipe } from './../../pipes/category-convert/category-convert.pipe';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadCrumbData } from '../../interfaces/bread-crumb-data';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-bread-crumbs',
  imports: [RouterLink, TitleCasePipe, CategoryConvertPipe],
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.scss',
})
export class BreadCrumbsComponent {
  public breadCrumbs: BreadCrumbData[] = [{ path: '', title: 'home' }];

  constructor(private readonly route: ActivatedRoute) {
    this.route.snapshot.url.forEach(({ path }) => {
      const prevPath = this.breadCrumbs[this.breadCrumbs.length - 1].path;
      this.breadCrumbs.push({ path: `${prevPath}/${path}`, title: path });
    });
  }
}
