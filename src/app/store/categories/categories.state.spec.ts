// import { TestBed } from '@angular/core/testing';
// import {  provideStore,  Store } from '@ngxs/store';
// import { CategoriesState, CategoriesStateModel } from './categories.state';
// import { QueryCategoriesAction } from './categories.actions';

// describe('Categories store', () => {
//   let store: Store;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//        providers: [provideStore([CategoriesState])]
      
//     });

//     store = TestBed.inject(Store);
//   });

//   it('should create an action and add an item', () => {
//     const expected: CategoriesStateModel = {
//       items: ['item-1']
//     };
//     store.dispatch(new QueryCategoriesAction('item-1'));
//     const actual = store.selectSnapshot(CategoriesState.getState);
//     expect(actual).toEqual(expected);
//   });

// });
