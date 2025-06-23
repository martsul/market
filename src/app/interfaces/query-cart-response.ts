import { CartProductData } from '../modules/cart-page/cart-card/interfaces/cart-product-data';

export interface QueryCartResponse {
  id: number;
  products: CartProductData[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}
