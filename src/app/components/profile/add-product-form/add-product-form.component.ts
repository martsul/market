import { Component, computed, inject, Signal } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../button/button.component';
import { InputData } from '../../../interfaces/input-data';
import { ProductFormData } from './interfaces/product-form-data';
import { Store } from '@ngxs/store';
import { AddProductAction } from '../../../store/products/products.actions';
import { SelectComponent } from '../../select/select.component';
import { CategoriesState } from '../../../store/categories/categories.state';
import { OptionData } from '../../select/interfaces/option-data';

@Component({
  selector: 'app-add-product-form',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
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

  public productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    category: ['', Validators.required],
    images: this.fb.array([] as FormControl<File>[]),
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
  public priceInputData: InputData = {
    color: 'grey',
    placeholder: 'Price',
    type: 'number',
    formControl: this.productForm.get('price') as FormControl<number>,
  };

  public images: string[] = [];

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  get categoryControl() {
    return this.productForm.get('category') as FormControl<string>;
  }

  public onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.updateFormImages(input);
      this.updateImages();
    }
  }

  private updateFormImages(input: HTMLInputElement): void {
    if (input.files) {
      const fileArray: FormArray = this.productForm.get('images') as FormArray;
      Array.from(input.files).forEach((file) => {
        fileArray.push(new FormControl(file, Validators.required));
      });
    }
  }

  private updateImages(): void {
    const fileArray: FormArray = this.productForm.get('images') as FormArray;
    setTimeout(() => {
      this.images = fileArray.controls.map((control) =>
        URL.createObjectURL(control.value)
      );
    });
  }

  public submit(event: Event) {
    event.preventDefault();
    const data: ProductFormData = this.getSubmitData();
    this.store.dispatch(new AddProductAction(data));
    this.resetForm();
  }

  private getSubmitData(): ProductFormData {
    const values = this.productForm.value;
    const images = values.images!.map((file) => URL.createObjectURL(file));
    return {
      description: values.description!,
      title: values.title!,
      images: images,
      thumbnail: images[0],
      price: values.price!,
      category: values.category!,
    };
  }

  private resetForm(): void {
    this.productForm.reset();
    this.images = [];
  }
}
