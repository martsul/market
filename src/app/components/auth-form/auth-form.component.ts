import { Component, signal, WritableSignal } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { InputData } from '../../interfaces/input-data';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { ButtonData } from '../../interfaces/button-data';
import { Store } from '@ngxs/store';
import { LogInAction } from '../../store/auth/auth.actions';
import { EMPTY, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  public error: WritableSignal<string | null> = signal<string | null>(null);
  public authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
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

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly fb: NonNullableFormBuilder
  ) {}

  public submit(event: Event) {
    event.preventDefault();
    this.store
      .dispatch(new LogInAction(this.authForm.getRawValue()))
      .pipe(
        tap({
          next: () => {
            this.error.set(null);
            this.router.navigate(['']);
          },
          error: () => {
            this.error.set('Unknown user. Please check the entered data.');
            return EMPTY;
          },
        })
      )
      .subscribe();
  }
}
