import { NgOptimizedImage } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { CountButtonComponent } from '../../../components/count-button/count-button.component';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-cart-card',
  imports: [NgOptimizedImage, CountButtonComponent],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.scss',
})
export class CartCardComponent {
  public id: InputSignal<number> = input.required<number>();
  public total: InputSignal<number> = input.required<number>();
  public quantity: InputSignal<number> = input.required<number>();
  public thumbnail: InputSignal<string> = input.required<string>();
  public title: InputSignal<string> = input.required<string>();

  constructor(private readonly store: Store) {}

  handlerDelete():void {
    
  }
}
