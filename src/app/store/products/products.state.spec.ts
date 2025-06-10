import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { ProductsState, ProductsStateModel } from './products.state';
import { ProductsAction } from './products.actions';

describe('Products store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([ProductsState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: ProductsStateModel = {
      items: ['item-1']
    };
    store.dispatch(new ProductsAction('item-1'));
    const actual = store.selectSnapshot(ProductsState.getState);
    expect(actual).toEqual(expected);
  });

});
