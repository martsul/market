import { ProductFormData } from './product-form-data';
export interface ProductCreateResponse extends ProductFormData {
  id: number;
}
