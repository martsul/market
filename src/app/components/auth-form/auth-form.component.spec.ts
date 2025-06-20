import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AuthFormComponent } from './auth-form.component';
import { Store } from '@ngxs/store';
import { of, throwError } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  const mockStore: jasmine.SpyObj<Store> = jasmine.createSpyObj('Store', [
    'dispatch',
  ]);
  const fakeEvent = jasmine.createSpyObj('Event', ['preventDefault']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent, RouterModule.forRoot([])],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent default and dispatch after submit', () => {
    mockStore.dispatch.and.returnValue(of());

    component.submit(fakeEvent);

    expect(fakeEvent.preventDefault).toHaveBeenCalled;
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('shout redirect after success log in', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const routerEvent = spyOn(router, 'navigate');

    mockStore.dispatch.and.returnValue(of(void 0));

    component.submit(fakeEvent);
    tick();

    expect(routerEvent).toHaveBeenCalled();
  }));

  it('should not redirect after error log in', fakeAsync(() => {
    const router = TestBed.inject(Router);
    const routerEvent = spyOn(router, 'navigate');
    const errorFactory: () => Error = (): Error => new Error('Login failed');

    mockStore.dispatch.and.returnValue(throwError(errorFactory));

    component.submit(fakeEvent);
    tick();

    expect(routerEvent).not.toHaveBeenCalled();
  }));
});
