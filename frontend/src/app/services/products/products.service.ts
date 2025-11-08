import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { map, Observable } from 'rxjs';
import { Products } from 'src/app/interfaces/products-interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly API_URL = environments.API_URL;
  private readonly JWT_TOKEN = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  };

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllProducts(): Observable<Products.ProductsResponse[]> {
    return this.http.get<Products.ProductsResponse[]>(
      `${this.API_URL}/products`,
      this.httpOptions
    ).pipe(
      map(product =>
        product.filter((data =>
          data.amount > 0)
        ))
    );
  }
}
