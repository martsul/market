import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHeadComponent } from './products-head.component';

describe('ProductsHeadComponent', () => {
  let component: ProductsHeadComponent;
  let fixture: ComponentFixture<ProductsHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsHeadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
