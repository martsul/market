import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-product-images',
  imports: [NgOptimizedImage],
  templateUrl: './product-images.component.html',
  styleUrl: './product-images.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductImagesComponent {
  public images: InputSignal<string[]> = input.required<string[]>();
  public activeImgIndex: WritableSignal<number> = signal<number>(0);

  public changeImg(index: number) {
    this.activeImgIndex.set(index);
  }
}
