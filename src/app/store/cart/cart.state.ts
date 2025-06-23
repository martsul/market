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
import { Observable, tap } from 'rxjs';
import { QueryCartResponse } from '../../interfaces/query-cart-response';

export type CartStateModel = CartProductData[];

@State<CartStateModel>({
  name: 'cart',
  defaults: [],
})
@Injectable()
export class CartState {
  constructor(private readonly apiService: ApiService) {}

  @Selector()
  static getCart(state: CartStateModel): CartProductData[] {
    return state;
  }

  @Selector()
  static getSubtotal(state: CartStateModel): number {
    return state.reduce<number>((acc, p) => {
      const subtotal = (p.total * 100) / (100 - p.discountPercentage);
      return acc + subtotal;
    }, 0);
  }

  @Selector()
  static getTotal(state: CartStateModel): number {
    return state.reduce<number>((acc, p) => acc + p.total, 0);
  }

  @Selector()
  static getDiscount(state: CartStateModel): number {
    const subtotal: number = this.getSubtotal(state);
    const total: number = this.getTotal(state);
    return subtotal - total;
  }

  @Action(QueryCartAction)
  queryCart(ctx: StateContext<CartStateModel>): Observable<QueryCartResponse> {
    return this.apiService.queryCart().pipe(
      tap((v): void => {
        console.log(v);
        ctx.setState(v.products);
      })
    );
  }

  @Action(DeleteProductAction)
  deleteProduct(
    ctx: StateContext<CartStateModel>,
    action: DeleteProductAction
  ): void {
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
  ): void {
    const state: CartStateModel = ctx.getState();
    const products: CartProductData[] = state.map((p) => {
      if (p.id === action.payload.id) {
        return { ...p, quantity: p.quantity + 1, total: p.total + p.price };
      }
      return p;
    });
    ctx.setState(products);
  }

  @Action(DecreaseProductAction)
  decreaseProduct(
    ctx: StateContext<CartStateModel>,
    action: DecreaseProductAction
  ): void {
    const state: CartStateModel = ctx.getState();
    const products: CartProductData[] = state.reduce<CartProductData[]>(
      (acc, p) => {
        if (p.id === action.payload.id && p.quantity > 1) {
          acc.push({
            ...p,
            quantity: p.quantity - 1,
            total: p.total - p.price,
          });
        } else if (p.id !== action.payload.id) {
          acc.push(p);
        }
        return acc;
      },
      []
    );
    ctx.setState(products);
  }
}
