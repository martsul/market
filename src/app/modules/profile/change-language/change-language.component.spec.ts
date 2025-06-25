import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguageComponent } from './change-language.component';
import { TranslateService } from '@ngx-translate/core';

describe('ChangeLanguageComponent', () => {
  let component: ChangeLanguageComponent;
  let fixture: ComponentFixture<ChangeLanguageComponent>;
  const mockTranslateService: jasmine.SpyObj<TranslateService> =
    jasmine.createSpyObj<TranslateService>('TranslateService', ['use']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeLanguageComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
