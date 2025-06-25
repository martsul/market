import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { TranslateService } from '@ngx-translate/core';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({ selector: 'app-header', template: '',standalone: true })
class MockFooterNewsletterComponent {}

@Component({ selector: 'app-footer', template: '',standalone: true })
class MockFooterContentComponent {}

describe('FooterComponent', () => {
  const mockTranslateService: jasmine.SpyObj<TranslateService> =
    jasmine.createSpyObj<TranslateService>('TranslateService', ['get']);
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, MockFooterNewsletterComponent, MockFooterContentComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
