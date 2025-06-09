import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserLinksComponent } from './header-user-links.component';

describe('HeaderUserLinksComponent', () => {
  let component: HeaderUserLinksComponent;
  let fixture: ComponentFixture<HeaderUserLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderUserLinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUserLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
