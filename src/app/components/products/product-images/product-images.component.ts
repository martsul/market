import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-product-images',
  imports: [NgOptimizedImage, NgxSkeletonLoaderModule],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductImagesComponent {
  public isLoaded: InputSignal<boolean> = input.required<boolean>();
  public images: InputSignal<string[]> = input.required<string[]>();
  public activeImgIndex: WritableSignal<number> = signal<number>(0);

  public swiperBreakpoints = {
    0: {
      direction: 'horizontal',
    },
    992: {
      direction: 'vertical',
    },
  };

  public changeImg(index: number) {
    this.activeImgIndex.set(index);
  }
}
