import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = signal<boolean>(false);

  public login() {
    this.isAuth.set(true);
  }

  public logout() {
    this.isAuth.set(false);
  }
}
