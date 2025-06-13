import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenPreviewComponent } from './women-preview.component';

describe('WomenPreviewComponent', () => {
  let component: WomenPreviewComponent;
  let fixture: ComponentFixture<WomenPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WomenPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomenPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
