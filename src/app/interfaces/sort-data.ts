import { ProductData } from "./product-data";

export interface SortData {
  sortBy: keyof ProductData;
  order: 'asc' | 'desc';
}
