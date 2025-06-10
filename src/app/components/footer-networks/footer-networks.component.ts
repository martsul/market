import { Component } from '@angular/core';
import { FooterNetworkComponent } from '../footer-network/footer-network.component';

@Component({
  selector: 'app-footer-networks',
  imports: [FooterNetworkComponent],
  templateUrl: './footer-networks.component.html',
  styleUrl: './footer-networks.component.scss',
})
export class FooterNetworksComponent {
  public networks = [
    { icon: 'twitter', href: '#' },
    { icon: 'facebook', href: '#' },
    { icon: 'inst', href: '#' },
    { icon: 'github', href: '#' },
  ];
}
