import { FormControl } from '@angular/forms';

export interface AuthForm {
  username: FormControl<string>;
  password: FormControl<string>;
}
