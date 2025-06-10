import { Component, input, InputSignal } from '@angular/core';
import { ButtonData } from '../../interfaces/button-data';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public buttonData: InputSignal<ButtonData> = input.required<ButtonData>();

  public getClasses(): string {
    return `custom-button ${this.buttonData().color}`;
  }
}
