import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/interfaces/category/categories-interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly API_URL = environments.API_URL;
  private readonly JWT_TOKEN = this.cookieService.get('USER_INFO');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  getAllCategories(): Observable<Categories.CategoriesResponse[]> {
    return this.http.get<Categories.CategoriesResponse[]>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }

  deleteCategory(requestData: { category_id: string }): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/category/delete`, {
      ...this.httpOptions,
      params: {
        id: requestData?.category_id,
      },
    });
  }

  createCategory(requestData: {
    name: string;
  }): Observable<Categories.CategoriesResponse> {
    return this.http.post<Categories.CategoriesResponse>(
      `${this.API_URL}/category`,
      requestData,
      this.httpOptions
    );
  }

  editCategory(requestData: { name: string; category_id: string }): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/category/edit`,
      { name: requestData.name },
      {
        ...this.httpOptions,
        params: {
          category_id: requestData.category_id,
        },
      }
    );
  }
}
