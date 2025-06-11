import { Component, signal, WritableSignal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-products-head',
  imports: [MatMenuModule],
  templateUrl: './products-head.component.html',
  styleUrl: './products-head.component.scss',
})
export class ProductsHeadComponent {
  public currentShowingProducts: string = '1-10';
  public allProducts: number = 100;
  public sortByField: WritableSignal<string> = signal<string>('Most expensive');

  public changeSortBy(field: string): void {
    this.sortByField.set(field);
  }
}
