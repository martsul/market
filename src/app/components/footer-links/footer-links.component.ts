import { Component, input } from '@angular/core';
import { FooterLinks } from '../../interfaces/footer-links';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-footer-links',
  imports: [UpperCasePipe],
  templateUrl: './footer-links.component.html',
  styleUrl: './footer-links.component.scss'
})
export class FooterLinksComponent {
  public links = input.required<FooterLinks>()
}
