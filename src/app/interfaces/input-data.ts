import { FormControl } from '@angular/forms';
import { InputTypes } from '../types/input-types';

export interface InputData {
  placeholder: string;
  color: 'white' | 'grey';
  type: InputTypes;
  icon?: string;
  formControl?: FormControl<unknown>
}
