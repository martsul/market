import { Component, input, InputSignal, Signal } from '@angular/core';
import { OptionData } from './interfaces/option-data';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  public options: InputSignal<OptionData[]> = input.required<OptionData[]>();
  public control: InputSignal<FormControl<string>> =
    input.required<FormControl<string>>();
}
