import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth: WritableSignal<boolean> = signal<boolean>(false);

  public login(): void {
    this.isAuth.set(true);
  }

  public logout(): void {
    this.isAuth.set(false);
  }
}
