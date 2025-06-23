export class QueryCartAction {
  static readonly type = '[Cart] Query Cart';
}

export class DeleteProductAction {
  static readonly type = '[Cart] Delete Product';
  constructor(public payload: { id: number }) {}
}

export class IncreaseProductAction {
  static readonly type = '[Cart] Increase Product';
  constructor(public payload: { id: number }) {}
}

export class DecreaseProductAction {
  static readonly type = '[Cart] Decrease Product';
  constructor(public payload: { id: number }) {}
}
