import { Component, input } from '@angular/core';
import { Network } from '../../interfaces/network';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-footer-network',
  imports: [SvgIconComponent],
  templateUrl: './footer-network.component.html',
  styleUrl: './footer-network.component.scss',
})
export class FooterNetworkComponent {
  public network = input.required<Network>();
}
