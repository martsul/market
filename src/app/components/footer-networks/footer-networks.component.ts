import { Component } from '@angular/core';
import { FooterNetworkComponent } from '../footer-network/footer-network.component';
import { NetworkData } from '../../interfaces/network-data';
import { NETWORKS } from '../../constants/networks';

@Component({
  selector: 'app-footer-networks',
  imports: [FooterNetworkComponent],
  templateUrl: './footer-networks.component.html',
  styleUrl: './footer-networks.component.scss',
})
export class FooterNetworksComponent {
  public networks: NetworkData[] = NETWORKS;
}
