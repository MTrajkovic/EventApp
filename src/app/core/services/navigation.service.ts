import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from 'src/app/shared/models/link.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Link[]> {
    return this.http.get<Link[]>(`${environment.baseApiURL}links`);
  }
}
