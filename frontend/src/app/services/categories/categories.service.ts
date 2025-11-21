import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/interfaces/categories-interface';
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

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getAllCategories(): Observable<Categories.CategoriesResponse[]> {
    return this.http.get<Categories.CategoriesResponse[]>(
      `${this.API_URL}/categories`,
      this.httpOptions
    );
  }
}
