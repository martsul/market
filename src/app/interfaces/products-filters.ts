import { ProductsPayload } from './products-payload';

export interface ProductsFilters extends ProductsPayload {
  skip: number;
  limit: number;
}
