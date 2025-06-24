import { Component, input, InputSignal } from '@angular/core';
import { FooterLinks } from '../../../interfaces/footer-links';
import { UpperCasePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-links',
  imports: [UpperCasePipe, TranslatePipe],
  templateUrl: './footer-links.component.html',
  styleUrl: './footer-links.component.scss',
})
export class FooterLinksComponent {
  public links: InputSignal<FooterLinks> = input.required<FooterLinks>();
}
