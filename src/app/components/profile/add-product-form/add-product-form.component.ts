import { Component, computed, inject, Signal } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { InputData } from '../../../interfaces/input-data';
import { ProductFormModel } from './interfaces/product-form-model';
import { Subscription, tap } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { ProductFormData } from './interfaces/product-form-data';
import { Store } from '@ngxs/store';
import { AddProductAction } from '../../../store/products/products.actions';
import { SelectComponent } from '../../select/select.component';
import { CategoriesState } from '../../../store/categories/categories.state';
import { OptionData } from '../../select/interfaces/option-data';
import { CategoryConvertPipe } from '../../../pipes/category-convert/category-convert.pipe';

@Component({
  selector: 'app-add-product-form',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
    SelectComponent,
  ],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.scss',
})
export class AddProductFormComponent {
  private categories: Signal<string[]> = this.store.selectSignal(
    CategoriesState.getCategories
  );
  public categoryOptions: Signal<OptionData[]> = computed<OptionData[]>(
    (): OptionData[] => {
      return this.categories().map((c) => ({
        value: c,
        text: c.split('-').join(' '),
      }));
    }
  );

  public productForm: FormGroup<ProductFormModel> = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    images: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    price: new FormControl<number>(0, {
      nonNullable: true,
      validators: Validators.required,
    }),
    category: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  public titleInputData: InputData = {
    color: 'grey',
    placeholder: 'Title',
    type: 'text',
    formControl: this.productForm.get('title') as FormControl<string>,
  };
  public descriptionInputData: InputData = {
    color: 'grey',
    placeholder: 'Description',
    type: 'text',
    formControl: this.productForm.get('description') as FormControl<string>,
  };
  public imagesInputData: InputData = {
    color: 'grey',
    placeholder: 'Images Links',
    type: 'text',
    formControl: this.productForm.get('images') as FormControl<string>,
  };
  public priceInputData: InputData = {
    color: 'grey',
    placeholder: 'Price',
    type: 'number',
    formControl: this.productForm.get('price') as FormControl<number>,
  };

  public images: string[] = [];
  private imagesSubscription: Subscription | undefined;

  constructor(private readonly store: Store) {
    this.imagesSubscription = this.productForm
      .get('images')
      ?.valueChanges.subscribe((v: string): void => {
        this.images = v.split(' ').filter((e) => e !== '');
      });
  }

  public submit(event: Event) {
    event.preventDefault();
    const values = this.productForm.value;
    const images = values.images!.split(' ').filter((i) => i !== '');
    console.log(values)
    const data: ProductFormData = {
      description: values.description!,
      title: values.title!,
      images,
      thumbnail: images[0],
      price: values.price!,
      category: values.category!,
    };
    this.store.dispatch(new AddProductAction(data));
  }

  ngOnDestroy(): void {
    this.imagesSubscription?.unsubscribe();
  }

  get categoryControl() {
    return this.productForm.get('category') as FormControl<string>;
  }
}
