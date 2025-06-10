import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenPreviewComponent } from './men-preview.component';

describe('MenPreviewComponent', () => {
  let component: MenPreviewComponent;
  let fixture: ComponentFixture<MenPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
