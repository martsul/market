import { Component } from '@angular/core';
import { HomePreviewComponent } from '../../modules/home-preview/home-preview.component';
import { BrandsComponent } from '../../modules/brands/brands.component';

@Component({
  selector: 'app-home-page',
  imports: [HomePreviewComponent, BrandsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
