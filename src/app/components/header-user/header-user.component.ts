import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header-user',
  imports: [MatMenuModule, ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss',
})
export class HeaderUserComponent {
  private readonly authService = new AuthService();

  public isAuth = this.authService.isAuth;
  public login = this.authService.login;
  public logout = this.authService.logout;
}
