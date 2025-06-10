import { Component, input } from '@angular/core';
import { InputData } from '../../interfaces/input-data';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-input',
  imports: [SvgIconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  public dataInput = input.required<InputData>({ alias: 'data-input' });

  public getClasses() {
    return `custom-input ${this.dataInput().color} ${
      this.dataInput().icon ? 'with-icon' : ''
    }`;
  }
}
