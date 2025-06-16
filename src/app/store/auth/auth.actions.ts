import { FormGroup } from "@angular/forms";
import { AuthForm } from "../../components/auth-form/interfaces/auth-form";

export class LogInAction {
  static readonly type = '[Auth] Log In';
  constructor(readonly payload:  FormGroup<AuthForm>) { }
}
