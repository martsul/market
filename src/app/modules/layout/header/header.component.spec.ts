import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component, input, InputSignal } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({ selector: 'app-header-menu', template: '' })
class MockHeaderMenuComponent {
  public menuIsOpen: InputSignal<boolean> = input.required<boolean>();
}
@Component({ selector: 'app-search', template: '' })
class MockSearchComponent {}
@Component({ selector: 'app-header-user', template: '' })
class MockHeaderUserComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'selectSignal']);

    TestBed.overrideComponent(HeaderComponent, {
      set: {
        imports: [
          MockHeaderMenuComponent,
          MockHeaderUserComponent,
          MockSearchComponent,
          RouterTestingModule,
        ],
      },
    });
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MockHeaderMenuComponent,
        MockHeaderUserComponent,
        MockSearchComponent,
        RouterTestingModule,
      ],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    const startValue: boolean = component.menuIsOpen;
    let result:boolean
    component.toggleMenuOpen()
    result = component.menuIsOpen
    expect(result).not.toBe(startValue)
    component.toggleMenuOpen()
    result = component.menuIsOpen
    expect(result).toBe(startValue)
  });
});
