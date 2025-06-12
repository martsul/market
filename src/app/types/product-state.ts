import { ProductData } from "../interfaces/product-data";

export type ProductState =
  | { requestStatus: 'idle'; product: null }
  | { requestStatus: 'loading'; product: null }
  | { requestStatus: 'error'; product: null }
  | { requestStatus: 'fulfilled'; product: ProductData };
