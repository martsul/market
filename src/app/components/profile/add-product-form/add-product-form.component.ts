import { Component } from '@angular/core';
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
import { ApiService } from '../../../services/api/api.service';
import { ProductFormData } from './interfaces/product-form-data';

@Component({
  selector: 'app-add-product-form',
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.scss',
})
export class AddProductFormComponent {
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

  public images: string[] = [];
  private imagesSubscriptions: Subscription | undefined;

  constructor(private readonly apiService: ApiService) {
    this.imagesSubscriptions = this.productForm
      .get('images')
      ?.valueChanges.subscribe((v: string): void => {
        this.images = v.split(' ').filter((e) => e !== '');
      });
  }

  public submit(event: Event) {
    event.preventDefault();
    const values = this.productForm.value;
    const images = (values.images as string).split(' ').filter((i) => i !== '');
    const data: ProductFormData = {
      description: values.description as string,
      title: values.title as string,
      images,
      thumbnail: images[0],
    };
    this.apiService.addProduct(data).pipe(tap(console.log)).subscribe()
  }

  ngOnDestroy(): void {
    this.imagesSubscriptions?.unsubscribe();
  }
}
