import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNewsletterComponent } from './footer-newsletter.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('FooterNewsletterComponent', () => {
  const mockTranslateService: jasmine.SpyObj<TranslateService> =
    jasmine.createSpyObj<TranslateService>('TranslateService', ['get']);
  let component: FooterNewsletterComponent;
  let fixture: ComponentFixture<FooterNewsletterComponent>;

  beforeEach(async () => {
    mockTranslateService.get.and.returnValue(of(''))

    await TestBed.configureTestingModule({
      imports: [FooterNewsletterComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
