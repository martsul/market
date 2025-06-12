import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountButtonComponent } from './count-button.component';

describe('CountButtonComponent', () => {
  let component: CountButtonComponent;
  let fixture: ComponentFixture<CountButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
