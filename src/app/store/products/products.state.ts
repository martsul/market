import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ProductData } from '../../interfaces/product-data';
import {
  QueryMenPreview,
  QueryProducts,
  QueryWomenPreview,
  SetProductsSkip,
} from './products.actions';
import { ProductResponse } from '../../interfaces/product-response';
import { ApiService } from '../../services/api/api.service';

export interface ProductsStateModel {
  limit: number;
  skip: number;
  total: number;
  products: ProductData[];
  womenPreview: ProductData[];
  menPreview: ProductData[];
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    limit: 12,
    skip: 0,
    total: 0,
    products: [],
    menPreview: [],
    womenPreview: [],
  },
})
@Injectable()
export class ProductsState {
  private readonly apiService: ApiService = inject(ApiService);

  @Selector()
  static getMenPreview(state: ProductsStateModel): ProductData[] {
    return state.menPreview;
  }
  @Selector()
  static getWomenPreview(state: ProductsStateModel): ProductData[] {
    return state.womenPreview;
  }
  @Selector()
  static getProductsLimit(state: ProductsStateModel): number {
    return state.limit;
  }
  @Selector()
  static getProductsSkip(state: ProductsStateModel): number {
    return state.skip;
  }
  @Selector()
  static getProductsTotal(state: ProductsStateModel): number {
    return state.total;
  }
  @Selector()
  static getProducts(state: ProductsStateModel): ProductData[] {
    return state.products;
  }

  @Action(SetProductsSkip)
  setProductsSkip(
    ctx: StateContext<ProductsStateModel>,
    action: SetProductsSkip
  ): void {
    ctx.patchState({ skip: action.payload.skip });
  }
  @Action(QueryWomenPreview)
  queryWomenPreview(ctx: StateContext<ProductsStateModel>): void {
    this.apiService.queryWomenPreview().subscribe((r) => {
      ctx.patchState({ womenPreview: r.products });
    });
  }
  @Action(QueryMenPreview)
  queryMenPreview(ctx: StateContext<ProductsStateModel>): void {
    this.apiService.queryMenPreview().subscribe((r) => {
      ctx.patchState({ menPreview: r.products });
    });
  }
  @Action(QueryProducts)
  QueryProducts(
    ctx: StateContext<ProductsStateModel>,
    action: QueryProducts
  ): void {
    const state = ctx.getState();
    this.apiService
      .queryProducts({
        ...action.payload,
        limit: state.limit,
        skip: state.skip,
      })
      .subscribe((r) => {
        const total = r.total;
        const products = r.products;
        ctx.patchState({ total, products });
      });
  }
}
