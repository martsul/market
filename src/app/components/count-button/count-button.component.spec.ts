import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountButtonComponent } from './count-button.component';

describe('CountButtonComponent', () => {
  let component: CountButtonComponent;
  let fixture: ComponentFixture<CountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase emit value', () => {
    const increasedValue = component.count() + 1;
    const setEvent = spyOn(component.count, 'set');
    const emitEvent = spyOn(component.handlerChange, 'emit');

    component.increase();

    expect(setEvent).toHaveBeenCalledWith(increasedValue);
    expect(emitEvent).toHaveBeenCalledWith(increasedValue);
  });

  it('should decrease with new value', () => {
    component.count.set(1);
    const decreasedValue = 0;
    const setEvent = spyOn(component.count, 'set');
    const emitEvent = spyOn(component.handlerChange, 'emit');

    component.decrease();

    expect(setEvent).toHaveBeenCalledWith(decreasedValue);
    expect(emitEvent).toHaveBeenCalledWith(decreasedValue);
  });

  it('should decrease with old value', () => {
    component.count.set(0);
    const decreasedValue = 0;
    const setEvent = spyOn(component.count, 'set');
    const emitEvent = spyOn(component.handlerChange, 'emit');

    component.decrease();

    expect(setEvent).toHaveBeenCalledWith(decreasedValue);
    expect(emitEvent).toHaveBeenCalledWith(decreasedValue);
  });
});
