import { Component } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';

@Component({
  selector: 'app-profile',
  imports: [UserInfoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
