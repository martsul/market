// import { TestBed } from '@angular/core/testing';
// import {  provideStore,  Store } from '@ngxs/store';
// import { CartState, CartStateModel } from './cart.state';
// import { CartAction } from './cart.actions';

// describe('Cart store', () => {
//   let store: Store;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//        providers: [provideStore([CartState])]
      
//     });

//     store = TestBed.inject(Store);
//   });

//   it('should create an action and add an item', () => {
//     const expected: CartStateModel = {
//       items: ['item-1']
//     };
//     store.dispatch(new CartAction('item-1'));
//     const actual = store.selectSnapshot(CartState.getState);
//     expect(actual).toEqual(expected);
//   });

// });
