import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { ButtonData } from '../../interfaces/button-data';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-button',
  imports: [SvgIconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public buttonData: InputSignal<ButtonData> = input.required<ButtonData>();
  public handlerClick: OutputEmitterRef<void> = output<void>();
  public disabled: InputSignal<boolean> = input<boolean>(false);
  public isSubmit: InputSignal<boolean> = input<boolean>(false)

  public getClasses(): string {
    return `custom-button ${this.buttonData().color}`;
  }

  public click(): void {
    this.handlerClick.emit();
  }
}
