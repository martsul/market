import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  styleUrl: './svg-icon.component.scss',
  template: '<svg:use class="svg-icon" [attr.href]="href"></svg:use>',
})
export class SvgIconComponent {
  public readonly icon: InputSignal<string> = input.required<string>();

  get href(): string {
    return `svg/${this.icon()}.svg#${this.icon()}`;
  }
}
