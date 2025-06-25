import { AuthForm } from '../../components/auth-form/interfaces/auth-form';

export class LogInAction {
  static readonly type = '[Auth] Log In';
  constructor(readonly payload: AuthForm) {}
}

export class LogOutAction {
  static readonly type = '[Auth] Log Out';
}

export class GetAuthDataAction {
  static readonly type = '[Auth] Get Auth Data';
}
