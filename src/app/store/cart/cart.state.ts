import { CartProductData } from '../../modules/cart-page/cart-card/interfaces/cart-product-data';
import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import {
  DecreaseProductAction,
  DeleteProductAction,
  IncreaseProductAction,
  QueryCartAction,
} from './cart.actions';
import { ApiService } from '../../services/api/api.service';
import { tap } from 'rxjs';

export type CartStateModel = CartProductData[];

@State<CartStateModel>({
  name: 'cart',
  defaults: [],
})
@Injectable()
export class CartState {
  constructor(private readonly apiService: ApiService) {}

  @Selector()
  static getCart(state: CartStateModel) {
    return state;
  }

  @Action(QueryCartAction)
  queryCart(ctx: StateContext<CartStateModel>) {
    return this.apiService.queryCart().pipe(
      tap((v): void => {
        ctx.setState(v.products);
      })
    );
  }

  @Action(DeleteProductAction)
  deleteProduct(
    ctx: StateContext<CartStateModel>,
    action: DeleteProductAction
  ) {
    const state: CartStateModel = ctx.getState();
    const products: CartProductData[] = state.filter(
      (p) => p.id !== action.payload.id
    );
    ctx.setState(products);
  }

  @Action(IncreaseProductAction)
  increaseProduct(
    ctx: StateContext<CartStateModel>,
    action: IncreaseProductAction
  ) {
    const state: CartStateModel = ctx.getState();
    const products: CartProductData[] = state.map((p) => {
      if (p.id === action.payload.id) {
        return { ...p, quantity: p.quantity + 1 };
      }
      return p;
    });
    ctx.setState(products);
  }

  @Action(DecreaseProductAction)
  decreaseProduct(
    ctx: StateContext<CartStateModel>,
    action: DecreaseProductAction
  ) {
    const state: CartStateModel = ctx.getState();
    const products: CartProductData[] = state.map((p) => {
      if (p.id === action.payload.id) {
        return { ...p, quantity: p.quantity - 1 };
      }
      return p;
    });
    ctx.setState(products);
  }
}
