import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { ProductData } from '../../interfaces/product-data';
import { QueryMenPreview, QueryWomenPreview } from './products.actions';
import { ProductResponse } from '../../interfaces/product-response';

export interface ProductsStateModel {
  womenPreview: ProductData[];
  menPreview: ProductData[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    menPreview: [],
    womenPreview: [],
  },
})
@Injectable()
export class ProductsState {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'https://dummyjson.com/products/';

  @Selector()
  static getMenPreview(state: ProductsStateModel) {
    return state.menPreview;
  }
  @Selector()
  static getWomenPreview(state: ProductsStateModel) {
    return state.womenPreview;
  }

  @Action(QueryWomenPreview)
  queryWomenPreview(ctx: StateContext<ProductsStateModel>) {
    this.http
      .get<ProductResponse>(`${this.baseUrl}category/womens-dresses`)
      .subscribe((v) => {
        ctx.patchState({ womenPreview: v.products });
      });
  }
  @Action(QueryMenPreview)
  queryMenPreview(ctx: StateContext<ProductsStateModel>) {
    this.http
      .get<ProductResponse>(`${this.baseUrl}category/mens-shirts`)
      .subscribe((v) => {
        ctx.patchState({ menPreview: v.products });
      });
  }
}
