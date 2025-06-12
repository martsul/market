import { ProductsPayload } from '../../interfaces/products-payload';
import { SortTitles } from '../../types/sort-titles';

export class QueryWomenPreviewAction {
  static readonly type: string = '[Products] Query Women Preview';
  constructor() {}
}

export class QueryMenPreviewAction {
  static readonly type: string = '[Products] Query Men Preview';
}

export class QueryProductsAction {
  static readonly type: string = '[Products] Query Products';
  constructor(public payload?: ProductsPayload) {}
}

export class SetProductsSkipAction {
  static readonly type: string = '[Products] Set Skip';
  constructor(public payload: { skip: number }) {}
}

export class SetSortFiledAction {
  static readonly type: string = '[Products] Set Sort Field';
  constructor(public payload: { sort: SortTitles }) {}
}

export class ChangePageAction {
  static readonly type: string = '[Products] Change Page';
  constructor(public payload: { page: number }) {}
}

export class SetStartPageAction {
  static readonly type: string = '[Products] Set Start Page';
}

export class QueryProductAction {
  static readonly type: string = '[Products] Query Products';
}