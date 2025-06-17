import { NgOptimizedImage } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState, AuthStateModel } from '../../../store/auth/auth.state';

@Component({
  selector: 'app-user-info',
  imports: [NgOptimizedImage],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  public authState: Signal<AuthStateModel> = this.store.selectSignal(
    AuthState.getState
  );

  constructor(private readonly store: Store) {}
}
