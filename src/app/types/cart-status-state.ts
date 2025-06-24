import { StatusState } from "../interfaces/status-state";
import { CartProductData } from "../modules/cart-page/cart-card/interfaces/cart-product-data";

export type CartStatusState = StatusState<CartProductData[]>