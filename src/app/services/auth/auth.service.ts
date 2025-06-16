import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthForm } from '../../components/auth-form/interfaces/auth-form';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from '../../interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http: HttpClient = inject<HttpClient>(HttpClient);
  private readonly baseUrl: string = 'https://dummyjson.com/auth/';
  public isAuth: WritableSignal<boolean> = signal<boolean>(false);

  public login(authData: FormGroup<AuthForm>): Observable<AuthResponse> {
    const body = JSON.stringify(authData.value);
    return this.http.post<AuthResponse>(this.baseUrl + 'login', body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public logout(): void {
    this.isAuth.set(false);
  }
}
