import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { ButtonData } from '../../interfaces/button-data';

const mockButtonData: ButtonData = {} as unknown as ButtonData;

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('buttonData', mockButtonData);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit output after click', () => {
    const event = spyOn(component.handlerClick, 'emit');
    component.click()
    expect(event).toHaveBeenCalled()
  });
});
