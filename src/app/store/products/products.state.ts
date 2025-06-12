import { ProductResponse } from './../../interfaces/product-response';
import { SortTitles } from './../../types/sort-titles';
import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ProductData } from '../../interfaces/product-data';
import {
  ChangePageAction,
  QueryMenPreviewAction,
  QueryProductAction,
  QueryProductsAction,
  QueryWomenPreviewAction,
  SetProductsSkipAction,
  SetSortFiledAction,
  SetStartPageAction,
} from './products.actions';
import { ApiService } from '../../services/api/api.service';
import { SortData } from '../../interfaces/sort-data';
import { SORT_FIELDS } from '../../constants/sort-fields';
import { ProductState } from '../../types/product-state';
import { catchError, EMPTY, Observable } from 'rxjs';

export interface ProductsStateModel {
  sort: SortData;
  limit: number;
  skip: number;
  total: number;
  products: ProductData[];
  womenPreview: ProductData[];
  menPreview: ProductData[];
  product: ProductState;
}

@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    limit: 12,
    skip: 0,
    total: 0,
    product: { requestStatus: 'idle', product: null },
    products: [],
    menPreview: [],
    womenPreview: [],
    sort: { sortBy: 'price', order: 'desc' },
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
  static getProductsPerPage(state: ProductsStateModel): number {
    return state.limit;
  }

  @Selector()
  static getProductsPage(state: ProductsStateModel): number {
    return (state.skip + state.limit) / state.limit;
  }

  @Selector()
  static getProductsTotal(state: ProductsStateModel): number {
    return state.total;
  }

  @Selector()
  static getProducts(state: ProductsStateModel): ProductData[] {
    return state.products;
  }

  @Selector()
  static getSortFieldName(state: ProductsStateModel): SortTitles {
    for (const key in SORT_FIELDS) {
      const title = key as SortTitles;
      const field = SORT_FIELDS[title];
      const { order, sortBy } = state.sort;
      if (field.order === order && field.sortBy === sortBy) {
        return title;
      }
    }
    return 'Most expensive';
  }

  @Selector()
  static getProduct(state: ProductsStateModel): ProductState {
    return state.product;
  }

  @Action(QueryProductAction)
  queryProduct(
    ctx: StateContext<ProductsStateModel>,
    action: QueryProductAction
  ) {
    ctx.patchState({ product: { requestStatus: 'loading', product: null } });
    this.apiService
      .queryProduct(action.payload.id)
      .pipe(
        catchError((): Observable<never> => {
          ctx.patchState({
            product: { requestStatus: 'error', product: null },
          });
          return EMPTY;
        })
      )
      .subscribe((product: ProductData): void => {
        ctx.patchState({ product: { requestStatus: 'fulfilled', product } });
      });
  }

  @Action(SetStartPageAction)
  setStartPage(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({ skip: 0 });
  }

  @Action(ChangePageAction)
  ChangePageAction(
    ctx: StateContext<ProductsStateModel>,
    action: ChangePageAction
  ) {
    const state = ctx.getState();
    const skip: number = state.limit * (action.payload.page - 1);
    ctx.patchState({ skip });
  }

  @Action(SetSortFiledAction)
  setSortField(
    ctx: StateContext<ProductsStateModel>,
    action: SetSortFiledAction
  ): void {
    const sort = SORT_FIELDS[action.payload.sort];
    ctx.patchState({ sort });
  }

  @Action(SetProductsSkipAction)
  setProductsSkip(
    ctx: StateContext<ProductsStateModel>,
    action: SetProductsSkipAction
  ): void {
    ctx.patchState({ skip: action.payload.skip });
  }

  @Action(QueryWomenPreviewAction)
  queryWomenPreview(ctx: StateContext<ProductsStateModel>): void {
    this.apiService.queryWomenPreview().subscribe((r: ProductResponse): void => {
      ctx.patchState({ womenPreview: r.products });
    });
  }

  @Action(QueryMenPreviewAction)
  queryMenPreview(ctx: StateContext<ProductsStateModel>): void {
    this.apiService.queryMenPreview().subscribe((r: ProductResponse): void => {
      ctx.patchState({ menPreview: r.products });
    });
  }

  @Action(QueryProductsAction)
  QueryProductsAction(
    ctx: StateContext<ProductsStateModel>,
    action: QueryProductsAction
  ): void {
    const state = ctx.getState();
    this.apiService
      .queryProducts({
        limit: state.limit,
        skip: state.skip,
        sort: state.sort,
        category: action.payload?.category,
      })
      .subscribe((r: ProductResponse): void => {
        const total: number = r.total;
        const products: ProductData[] = r.products;
        ctx.patchState({ total, products });
      });
  }
}
