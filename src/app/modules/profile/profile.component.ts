import { Component } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ChangeLanguageComponent } from './change-language/change-language.component';

@Component({
  selector: 'app-profile',
  imports: [UserInfoComponent, AddProductComponent, ChangeLanguageComponent],
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
