import {
  Component,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-count-button',
  imports: [],
  templateUrl: './count-button.component.html',
  styleUrl: './count-button.component.scss',
})
export class CountButtonComponent {
  public count: WritableSignal<number> = signal<number>(1);
  public handlerChange: OutputEmitterRef<number> = output<number>();

  public increase(): void {
    const increasedValue = this.count() + 1;
    this.count.set(increasedValue);
    this.handlerChange.emit(increasedValue);
  }

  public decrease(): void {
    const decreasedValue = this.count() > 0 ? this.count() - 1 : this.count();
    this.count.set(decreasedValue);
    this.handlerChange.emit(decreasedValue);
  }
}
