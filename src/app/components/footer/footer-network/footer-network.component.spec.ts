import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNetworkComponent } from './footer-network.component';
import { Network } from '../../../interfaces/network';

describe('FooterNetworkComponent', () => {
  let component: FooterNetworkComponent;
  let fixture: ComponentFixture<FooterNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterNetworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterNetworkComponent);
    fixture.componentRef.setInput("network", {} as unknown as Network)

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
