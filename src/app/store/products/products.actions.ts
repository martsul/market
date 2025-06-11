import { ProductsPayload } from '../../interfaces/products-payload';

export class QueryWomenPreview {
  static readonly type: string = '[Products] Query Women Preview';
  constructor() {}
}

export class QueryMenPreview {
  static readonly type: string = '[Products] Query Men Preview';
}

export class QueryProducts {
  static readonly type: string = '[Products] Query Products';
  constructor(public payload?: ProductsPayload) {}
}

export class SetProductsSkip {
  static readonly type: string = '[Products] Set Skip';
  constructor(public payload: { skip: number }) {}
}
