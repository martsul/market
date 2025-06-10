import { Component, input } from '@angular/core';
import { ButtonData } from '../../interfaces/button-data';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  public buttonData = input.required<ButtonData>()

  public getClasses() {
    return `custom-button ${this.buttonData().color}` 
  }
}
