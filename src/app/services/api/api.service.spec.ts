import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ProductFormData } from '../../components/profile/add-product-form/interfaces/product-form-data';
import { AuthForm } from '../../components/auth-form/interfaces/auth-form';
import { FormGroup } from '@angular/forms';
import { ProductsFilters } from '../../interfaces/products-filters';

describe('ApiService', () => {
  let service: ApiService;
  let httpTesting: HttpTestingController;
  const mockCookieService = jasmine.createSpyObj('CookieService', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CookieService, useValue: mockCookieService },
      ],
    });
    service = TestBed.inject(ApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get auth data', () => {
    service.getAuthData().subscribe();

    const req = httpTesting.expectOne('https://dummyjson.com/auth/me');
    expect(req.request.method).toBe('GET');
  });

  it('should get refreshToken post refresh tokens', () => {
    service.refreshTokens().subscribe();

    const req = httpTesting.expectOne('https://dummyjson.com/auth/refresh');

    expect(mockCookieService.get).toHaveBeenCalled();
    expect(req.request.method).toBe('POST');
  });

  it('should post add product', () => {
    const mockProduct = {} as unknown as ProductFormData;

    service.addProduct(mockProduct).subscribe();

    const req = httpTesting.expectOne('https://dummyjson.com/products/add');
    expect(req.request.method).toBe('POST');
  });

  it('should post login', () => {
    const mockLogInData = new FormGroup({}) as unknown as FormGroup<AuthForm>;

    service.login(mockLogInData).subscribe();

    const req = httpTesting.expectOne('https://dummyjson.com/auth/login');

    expect(req.request.method).toBe('POST');
  });

  it('should query product', () => {
    service.queryProduct(1).subscribe();

    const req = httpTesting.expectOne('https://dummyjson.com/products/1');

    expect(req.request.method).toBe('GET');
  });

  it('should query categories', () => {
    service.queryProductCategories().subscribe();

    const req = httpTesting.expectOne(
      'https://dummyjson.com/products/category-list'
    );

    expect(req.request.method).toBe('GET');
  });

  it('should query women preview', () => {
    service.queryWomenPreview().subscribe();

    const req = httpTesting.expectOne(
      'https://dummyjson.com/products/category/womens-dresses'
    );

    expect(req.request.method).toBe('GET');
  });

  it('should query men preview', () => {
    service.queryMenPreview().subscribe();

    const req = httpTesting.expectOne(
      'https://dummyjson.com/products/category/mens-shirts'
    );

    expect(req.request.method).toBe('GET');
  });

  it('should get products include limit, skip and sorting in URL', () => {
    const filters: ProductsFilters = {
      category: 'mens-shirts',
      limit: 5,
      skip: 10,
      sort: {
        sortBy: 'price',
        order: 'desc',
      },
    };

    const expectedUrl =
      'https://dummyjson.com/products/category/mens-shirts?limit=5&skip=10&sortBy=price&order=desc';

    service.queryProducts(filters).subscribe();

    const req = httpTesting.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should get products without category in URL', () => {
    const filters: ProductsFilters = {
      limit: 5,
      skip: 10,
      sort: {
        sortBy: 'price',
        order: 'desc',
      },
    };

    const expectedUrl =
      'https://dummyjson.com/products/?limit=5&skip=10&sortBy=price&order=desc';

    service.queryProducts(filters).subscribe();

    const req = httpTesting.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});
