import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { InputData } from '../../interfaces/input-data';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [SvgIconComponent, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  public dataInput: InputSignal<InputData> = input.required<InputData>({
    alias: 'data-input',
  });

  public formControl: Signal<FormControl<unknown>> = computed(
    (): FormControl<unknown> => {
      return this.dataInput().formControl || new FormControl();
    }
  );

  public getClasses(): string {
    return `custom-input ${this.dataInput().color} ${
      this.dataInput().icon ? 'with-icon' : ''
    }`;
  }
}
