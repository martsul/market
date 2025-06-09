import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { QueryCategoriesAction } from './categories.actions';
import { ApiService } from '../../services/api/api.service';

export interface CategoriesStateModel {
  categories: string[];
}

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: {
    categories: [],
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
    this.apiService.queryProductCategories().subscribe((categories) => {
      ctx.patchState({ categories });
    });
  }
}
