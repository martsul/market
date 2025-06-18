import { FormControl } from '@angular/forms';

export interface ProductFormModel {
  title: FormControl<string>;
  description: FormControl<string>;
  images: FormControl<string>;
  category: FormControl<string>;
  price: FormControl<number>;
}
