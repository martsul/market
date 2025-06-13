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
    this.count.set(this.count() + 1);
    this.handlerChange.emit(this.count());
  }

  public decrease(): void {
    if (this.count() > 0) {
      this.count.set(this.count() - 1);
    }
    this.handlerChange.emit(this.count());
  }
}
