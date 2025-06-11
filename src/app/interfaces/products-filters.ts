import { ProductsPayload } from './products-payload';
import { SortData } from './sort-data';

export interface ProductsFilters extends ProductsPayload {
  skip: number;
  limit: number;
  sort?: SortData;
}
