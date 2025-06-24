import { Component } from '@angular/core';
import { FooterNetworkComponent } from '../footer-network/footer-network.component';
import { NetworkData } from '../../../interfaces/network-data';
import { NETWORKS } from '../../../constants/networks';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer-networks',
  imports: [FooterNetworkComponent, TranslatePipe],
  templateUrl: './footer-networks.component.html',
  styleUrl: './footer-networks.component.scss',
})
export class FooterNetworksComponent {
  public networks: NetworkData[] = NETWORKS;
}
