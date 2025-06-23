import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CountButtonSizes } from '../../types/count-button-sizes';

@Component({
  selector: 'app-count-button',
  imports: [],
  templateUrl: './count-button.component.html',
  styleUrl: './count-button.component.scss',
})
export class CountButtonComponent {
  public quantity: InputSignal<number | undefined> = input<
    number | undefined
  >();
  public ownQuantity: WritableSignal<number> = signal<number>(1);
  public handlerIncrease: OutputEmitterRef<void> = output<void>();
  public handlerDecrease: OutputEmitterRef<void> = output<void>();
  public size: InputSignal<CountButtonSizes> = input<CountButtonSizes>('big');

  public increase(): void {
    if (this.quantity() === undefined) {
      this.ownIncrease();
    } else {
      this.handlerDecrease.emit();
    }
  }

  public decrease(): void {
    if (this.quantity() === undefined) {
      this.ownDecrease();
    } else {
      this.handlerDecrease.emit();
    }
  }

  private ownIncrease(): void {
    this.ownQuantity.set(this.ownQuantity() + 1);
  }

  private ownDecrease(): void {
    if (this.ownQuantity() > 0) {
      this.ownQuantity.set(this.ownQuantity() - 1);
    }
  }
}
