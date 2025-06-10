import { Component } from '@angular/core';
import { HomePreviewComponent } from '../../modules/home-preview/home-preview.component';
import { BrandsComponent } from '../../modules/brands/brands.component';
import { WomenPreviewComponent } from '../../modules/women-preview/women-preview.component';
import { MenPreviewComponent } from '../../modules/men-preview/men-preview.component';

@Component({
  selector: 'app-home-page',
  imports: [HomePreviewComponent, BrandsComponent, WomenPreviewComponent, MenPreviewComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
