import { IsLoadedService } from './../../services/is-loaded/is-loaded.service';
import { Component, Signal } from '@angular/core';
import { BreadCrumbsComponent } from '../bread-crumbs/bread-crumbs.component';
import { Store } from '@ngxs/store';
import { QueryCartAction } from '../../store/cart/cart.actions';
import { CartProductData } from './cart-card/interfaces/cart-product-data';
import { CartState } from '../../store/cart/cart.state';
import { CartCardComponent } from './cart-card/cart-card.component';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-cart-page',
  imports: [
    BreadCrumbsComponent,
    CartCardComponent,
    InputComponent,
    ButtonComponent,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  public subtotal: Signal<number> = this.store.selectSignal(
    CartState.getSubtotal
  );
  public total: Signal<number> = this.store.selectSignal(CartState.getTotal);
  public discount: Signal<number> = this.store.selectSignal(
    CartState.getDiscount
  );
  public cartGoods: Signal<CartProductData[]> = this.store.selectSignal(
    CartState.getCart
  );
  public isLoaded: Signal<boolean> = this.isLoadedService.getCartPageIsLoaded()

  constructor(
    private readonly store: Store,
    private readonly isLoadedService: IsLoadedService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new QueryCartAction());
  }
}
