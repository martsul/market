import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenuComponent } from './header-menu.component';
import { signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { RouterModule } from '@angular/router';

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let fixture: ComponentFixture<HeaderMenuComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['selectSignal']);
    mockStore.selectSignal.and.returnValue(signal([]));

    await TestBed.configureTestingModule({
      imports: [HeaderMenuComponent, RouterModule.forRoot([])],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderMenuComponent);
    fixture.componentRef.setInput('menuIsOpen', false);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close menu', () => {
    const event = spyOn(component.toggleMenuOpen, 'emit');
    component.closeMenu();
    expect(event).toHaveBeenCalled();
  });

  it('should toggle menu', () => {
    const startValue: boolean = component.accordionIsOpen();
    let result: boolean;
    component.toggleAccordion();
    result = component.accordionIsOpen();
    expect(result).not.toBe(startValue);
    component.toggleAccordion();
    result = component.accordionIsOpen();
    expect(result).toBe(startValue);
  });
});
