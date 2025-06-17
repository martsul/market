import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsFilters } from '../../interfaces/products-filters';
import { ProductResponse } from '../../interfaces/product-response';
import { ProductData } from '../../interfaces/product-data';
import { FormGroup } from '@angular/forms';
import { AuthForm } from '../../components/auth-form/interfaces/auth-form';
import { AuthResponse } from '../../interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = 'https://dummyjson.com';

  public login(authData: FormGroup<AuthForm>): Observable<AuthResponse> {
    const body = JSON.stringify(authData.value);
    return this.http.post<AuthResponse>(this.baseUrl + '/auth/login', body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public queryProduct(id: number): Observable<ProductData> {
    return this.http.get<ProductData>(this.baseUrl + `/products/${id}`);
  }

  public queryProductCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/category-list`);
  }

  public queryWomenPreview(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      this.baseUrl + '/products/category/womens-dresses'
    );
  }

  public queryMenPreview(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      this.baseUrl + '/products/category/mens-shirts'
    );
  }

  public queryProducts(filters: ProductsFilters): Observable<ProductResponse> {
    const url = this.getQueryUrl(filters);
    return this.http.get<ProductResponse>(url);
  }

  private getQueryUrl(filters: ProductsFilters): string {
    let url: string = this.baseUrl + '/products/';
    const urlWithCategory = this.addCategoryInUrl(url, filters.category);
    const urlWithFilters = this.addFiltersInUrl(urlWithCategory, filters);
    return urlWithFilters;
  }

  private addCategoryInUrl(queryUrl: string, category?: string): string {
    if (category) {
      return queryUrl + `category/${category}`;
    }
    return queryUrl;
  }

  private addFiltersInUrl(url: string, filters: ProductsFilters): string {
    const filtersParams: string[][] = [
      ['limit', `${filters.limit}`],
      ['skip', `${filters.skip}`],
    ];
    if (filters?.sort) {
      filtersParams.push(
        ['sortBy', filters.sort.sortBy],
        ['order', filters.sort.order]
      );
    }
    return url + '?' + filtersParams.map((p): string => p.join('=')).join('&');
  }
}
