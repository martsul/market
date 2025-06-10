import { InputTypes } from '../types/input-types';

export interface InputData {
  icon?: string;
  placeholder: string;
  color: 'white' | 'grey';
  type: InputTypes;
}
