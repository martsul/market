import { ProductData } from './product-data';

export interface ProductResponse {
  limit: number;
  skip: number;
  total: number;
  products: ProductData[];
}
