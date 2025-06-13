import { Component } from '@angular/core';
import { HomePreviewComponent } from './home-preview/home-preview.component';
import { BrandsComponent } from './brands/brands.component';
import { WomenPreviewComponent } from './women-preview/women-preview.component';
import { MenPreviewComponent } from './men-preview/men-preview.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HomePreviewComponent,
    BrandsComponent,
    WomenPreviewComponent,
    MenPreviewComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
