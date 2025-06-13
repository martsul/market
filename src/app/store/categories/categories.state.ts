import { inject, Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { QueryCategoriesAction } from './categories.actions';
import { ApiService } from '../../services/api/api.service';
import { Observable, tap } from 'rxjs';

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
  private readonly apiService: ApiService = inject(ApiService);

  @Selector()
  static getCategories(state: CategoriesStateModel): string[] {
    return state.categories;
  }

  @Action(QueryCategoriesAction)
  queryCategories(ctx: StateContext<CategoriesStateModel>): Observable<string[]> {
    return this.apiService.queryProductCategories().pipe(
      tap((categories) => {
        ctx.patchState({ categories });
      })
    );
  }
}
