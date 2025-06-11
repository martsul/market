import { SortData } from './sort-data';

export interface ProductsFilters {
  skip: number;
  limit: number;
  sort?: SortData;
}
