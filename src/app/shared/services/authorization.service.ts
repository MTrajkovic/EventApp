import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user.model';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient) {}

  login(user: RegisterUser): Observable<RegisterUser[]> {
    return this.http.get<RegisterUser[]>(
      `${environment.baseApiURL}users?email=${user.email}&password=${user.password}`
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseApiURL}users`, user);
  }

  isAdmin(): boolean {
    return localStorage.getItem('Role') === Role.Admin;
  }

  isLogedIn(): boolean {
    const userData = localStorage.getItem('User');
    return userData !== null;
  }
}
