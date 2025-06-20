import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle open', () => {
    const startValue: boolean = component.searchIsOpen();
    let result: boolean;
    component.toggleOpenSearch();
    result = component.searchIsOpen();
    expect(result).not.toBe(startValue);
    component.toggleOpenSearch();
    result = component.searchIsOpen();
    expect(result).toBe(startValue);
  });

  it('should close search after click', () => {
    const fakeTarget: HTMLDivElement = document.createElement('div');
    const fakeEvent: MouseEvent = {
      target: fakeTarget,
    } as unknown as MouseEvent;

    component.searchIsOpen.set(true);
    component.onDocumentClick(fakeEvent);
    const result = component.searchIsOpen();

    expect(result).toBeFalse();
  });

  it('should not close search after click', () => {
    const fakeTarget: HTMLDivElement = document.createElement('div');
    fakeTarget.classList.add('search');
    const fakeEvent: MouseEvent = {
      target: fakeTarget,
    } as unknown as MouseEvent;

    component.searchIsOpen.set(true);
    component.onDocumentClick(fakeEvent);
    const result = component.searchIsOpen();

    expect(result).toBeTruthy();
  });

  it('should close search after esc click', () => {
    component.searchIsOpen.set(true);
    component.onEscPress()
    const result: boolean = component.searchIsOpen()
    expect(result).toBeFalsy() 
  });
});
