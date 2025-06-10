import { Component } from '@angular/core';
import { FooterNetworksComponent } from '../footer-networks/footer-networks.component';
import { FooterLinksComponent } from '../footer-links/footer-links.component';
import { FooterLinks } from '../../interfaces/footer-links';
import { FOOTER_LINKS } from '../../constants/footer-links';

@Component({
  selector: 'app-footer-content',
  imports: [FooterNetworksComponent, FooterLinksComponent],
  templateUrl: './footer-content.component.html',
  styleUrl: './footer-content.component.scss',
})
export class FooterContentComponent {
  public links: FooterLinks[] = FOOTER_LINKS;
}
