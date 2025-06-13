import { Component } from '@angular/core';
import { FooterNewsletterComponent } from '../../../components/footer/footer-newsletter/footer-newsletter.component';
import { FooterContentComponent } from '../../../components/footer/footer-content/footer-content.component';

@Component({
  selector: 'app-footer',
  imports: [FooterNewsletterComponent, FooterContentComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
