import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { InputData } from '../../interfaces/input-data';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthForm } from './interfaces/auth-form';
import { ButtonComponent } from '../button/button.component';
import { ButtonData } from '../../interfaces/button-data';
import { Store } from '@ngxs/store';
import { LogInAction } from '../../store/auth/auth.actions';
import { catchError, EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  public authForm: FormGroup<AuthForm> = new FormGroup<AuthForm>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  public emailInputOptions: InputData = {
    icon: 'person',
    color: 'grey',
    placeholder: 'Username',
    type: 'text',
    formControl: this.authForm.get('username') as FormControl<string>,
  };
  public passwordInputOptions: InputData = {
    icon: 'lock',
    color: 'grey',
    placeholder: 'Password',
    type: 'password',
    formControl: this.authForm.get('password') as FormControl<string>,
  };

  public submitButtonOptions: ButtonData = {
    color: 'dark',
    text: 'Log In',
  };

  constructor(private readonly store: Store, private readonly router: Router) {}

  public submit(event: Event) {
    event.preventDefault();
    this.store
      .dispatch(new LogInAction(this.authForm))
      .pipe(
        tap(() => {
          this.router.navigate(['']);
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe();
  }
}
