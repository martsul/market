import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { QueryCategoriesAction } from './categories.actions';
import { ApiService } from '../../services/api.service';
import { Observable, of } from 'rxjs';

export interface CategoriesStateModel {
  categories: Observable<string[]>;
}

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: of([]),
  },
})
@Injectable()
export class CategoriesState {
  private readonly apiService = new ApiService();

  @Selector()
  static getCategories(state: CategoriesStateModel) {
    return state.categories;
  }

  @Action(QueryCategoriesAction)
  queryCategories(ctx: StateContext<CategoriesStateModel>) {
    const stateModel = ctx.getState();
    stateModel.categories = this.apiService.queryProductCategories();
    ctx.setState(stateModel);
  }
}
