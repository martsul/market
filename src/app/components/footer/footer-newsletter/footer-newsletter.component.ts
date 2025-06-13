import { Component } from '@angular/core';
import { InputComponent } from '../../input/input.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-footer-newsletter',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './footer-newsletter.component.html',
  styleUrl: './footer-newsletter.component.scss',
})
export class FooterNewsletterComponent {}
