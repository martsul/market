import { NgOptimizedImage } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { CountButtonComponent } from '../../../components/count-button/count-button.component';
import { Store } from '@ngxs/store';
import {
  DecreaseProductAction,
  DeleteProductAction,
  IncreaseProductAction,
} from '../../../store/cart/cart.actions';

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

  handlerDelete(): void {
    this.store.dispatch(new DeleteProductAction({ id: this.id() }));
  }

  handlerIncrease(): void {
    this.store.dispatch(new IncreaseProductAction({ id: this.id() }));
  }

  handlerDecrease(): void {
    this.store.dispatch(new DecreaseProductAction({ id: this.id() }));
  }
}
