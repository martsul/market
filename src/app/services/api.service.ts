import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://dummyjson.com';

  public queryProductCategories() {
    return this.http.get<string[]>(`${this.baseUrl}/products/category-list`);
  }
}
