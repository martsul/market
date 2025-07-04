import { ProductData } from '../interfaces/product-data';
import { StatusState } from '../interfaces/status-state';

export type ProductState = StatusState<ProductData | null>;
