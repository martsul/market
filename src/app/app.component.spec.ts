import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  const mockTranslateService: jasmine.SpyObj<TranslateService> =
    jasmine.createSpyObj<TranslateService>('TranslateService', [
      'addLangs',
      'setDefaultLang',
      'use',
    ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
