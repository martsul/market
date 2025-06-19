import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderUserComponent } from './header-user.component';
import { Store } from '@ngxs/store';
import { signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;
  const mockStore: jasmine.SpyObj<Store> = jasmine.createSpyObj('Store', [
    'dispatch',
    'selectSignal',
  ]);
  const mockCookieService: jasmine.SpyObj<CookieService> = jasmine.createSpyObj(
    'CookieService',
    ['deleteAll']
  );

  beforeEach(async () => {
    mockStore.selectSignal.and.returnValue(
      signal({ status: 'no auth', userData: null })
    );

    await TestBed.configureTestingModule({
      imports: [HeaderUserComponent, RouterTestingModule],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: CookieService, useValue: mockCookieService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const router = TestBed.inject(Router);
    const routerEvent = spyOn(router, 'navigate');

    component.logout();

    expect(routerEvent).toHaveBeenCalled();
    expect(mockCookieService.deleteAll).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
