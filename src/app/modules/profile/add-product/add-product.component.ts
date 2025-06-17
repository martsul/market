import { Component } from '@angular/core';
import { AddProductFormComponent } from '../../../components/profile/add-product-form/add-product-form.component';

@Component({
  selector: 'app-add-product',
  imports: [AddProductFormComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {}
