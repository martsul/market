import { Component } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-profile',
  imports: [UserInfoComponent, AddProductComponent],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
