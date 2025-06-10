import { Component, input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  styleUrl: './svg-icon.component.scss',
  template: '<svg:use class="svg-icon" [attr.href]="href"></svg:use> <div class="text">asdasd</div>',
})
export class SvgIconComponent {
  public readonly icon = input.required<string>();

  get href() {
    return `svg/icons.svg#${this.icon()}`;
  }
}
