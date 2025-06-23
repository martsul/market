import { Component, Signal } from '@angular/core';
import { BreadCrumbsComponent } from '../bread-crumbs/bread-crumbs.component';
import { Store } from '@ngxs/store';
import { QueryCartAction } from '../../store/cart/cart.actions';
import { CartProductData } from './cart-card/interfaces/cart-product-data';
import { CartState } from '../../store/cart/cart.state';
import { CartCardComponent } from './cart-card/cart-card.component';
import { InputComponent } from "../../components/input/input.component";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-cart-page',
  imports: [BreadCrumbsComponent, CartCardComponent, InputComponent, ButtonComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  public cartGoods: Signal<CartProductData[]> = this.store.selectSignal(
    CartState.getCart
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new QueryCartAction());
  }
}
