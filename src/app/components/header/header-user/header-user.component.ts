import { Component, WritableSignal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-user',
  imports: [MatMenuModule, RouterLink],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss',
})
export class HeaderUserComponent {
  private readonly authService: AuthService = new AuthService();

  public isAuth: WritableSignal<boolean> = this.authService.isAuth;
  public logout: () => void = this.authService.logout;
}
