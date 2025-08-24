import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth-interface';
import { User } from 'src/app/interfaces/user-interface';

import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = environments.API_URL;

  constructor(private readonly http: HttpClient) { }

  signupUser(requestData: User.UserRequest): Observable<User.UserResponse> {

    return this.http.post<User.UserResponse>(`${this.API_URL}/user`, requestData);
  }

  authUser(requestData: Auth.AuthRequest): Observable<Auth.AuthResponse> {
    return this.http.post<Auth.AuthResponse>(`${this.API_URL}/auth`, requestData);

  }
}
