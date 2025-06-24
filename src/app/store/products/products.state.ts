import { ProductResponse } from './../../interfaces/product-response';
import { SortTitles } from './../../types/sort-titles';
import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { ProductData } from '../../interfaces/product-data';
import {
  AddProductAction,
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
import { catchError, EMPTY, Observable } from 'rxjs';
import { ProductReview } from '../../interfaces/product-review';
import { ProductState } from '../../types/product-state';
import { ProductsStatusState } from '../../types/products-status-state';
import { RequestStatus } from '../../types/request-status';

export interface ProductsStateModel {
  sort: SortData;
  limit: number;
  skip: number;
  total: number;
  products: ProductsStatusState;
  addedProducts: ProductData[];
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
    product: { requestStatus: 'idle', data: null },
    products: { requestStatus: 'idle', data: [] },
    addedProducts: [],
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
  static getProductsStatus(state: ProductsStateModel): RequestStatus {
    return state.products.requestStatus;
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
    return state.addedProducts.concat(state.products.data || []);
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

  @Selector()
  static getReviews(state: ProductsStateModel): ProductReview[] | undefined {
    return state.product.data?.reviews;
  }

  @Action(QueryProductAction)
  queryProduct(
    ctx: StateContext<ProductsStateModel>,
    action: QueryProductAction
  ) {
    const state = ctx.getState();
    if (action.payload.id >= 195) {
      ctx.patchState({
        product: {
          requestStatus: 'fulfilled',
          data: state.addedProducts.find((p) => p.id === action.payload.id)!,
        },
      });
      return;
    }
    ctx.patchState({ product: { requestStatus: 'loading', data: null } });
    this.apiService
      .queryProduct(action.payload.id)
      .pipe(
        catchError((): Observable<never> => {
          ctx.patchState({
            product: { requestStatus: 'error', data: null },
          });
          return EMPTY;
        })
      )
      .subscribe((data: ProductData): void => {
        ctx.patchState({ product: { requestStatus: 'fulfilled', data } });
      });
  }

  @Action(QueryProductsAction)
  QueryProducts(
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
        const data: ProductData[] = r.products;
        ctx.patchState({
          total,
          products: { requestStatus: 'fulfilled', data },
        });
      });
  }

  @Action(SetStartPageAction)
  setStartPage(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({ skip: 0 });
  }

  @Action(ChangePageAction)
  ChangePage(ctx: StateContext<ProductsStateModel>, action: ChangePageAction) {
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
    this.apiService
      .queryWomenPreview()
      .subscribe((r: ProductResponse): void => {
        ctx.patchState({ womenPreview: r.products });
      });
  }

  @Action(QueryMenPreviewAction)
  queryMenPreview(ctx: StateContext<ProductsStateModel>): void {
    this.apiService.queryMenPreview().subscribe((r: ProductResponse): void => {
      ctx.patchState({ menPreview: r.products });
    });
  }

  @Action(AddProductAction)
  addProduct(ctx: StateContext<ProductsStateModel>, action: AddProductAction) {
    const addedProducts: ProductData[] = ctx.getState().addedProducts;
    addedProducts.push({
      id: 195 + addedProducts.length,
      title: action.payload.title,
      description: action.payload.description,
      category: action.payload.category,
      price: action.payload.price,
      rating: 0,
      stock: 0,
      tags: [],
      sku: 'sku',
      weight: 9999,
      dimensions: { depth: 0, height: 0, width: 0 },
      availabilityStatus: 'available',
      brand: 'brand',
      images: action.payload.images,
      meta: {
        barcode: 'barcode',
        createdAt: new Date(),
        qrCode: 'qeCode',
        updatedAt: new Date(),
      },
      minimumOrderQuantity: 1,
      returnPolicy: 'policy',
      reviews: [],
      shippingInformation: 'shippingInformation',
      thumbnail: action.payload.images[0],
      warrantyInformation: 'warrantyInformation',
    });
  }
}
