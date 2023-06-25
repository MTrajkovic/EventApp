import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private route: Router) {}

  canActivate(): boolean {
    return this.isUserLoggedIn();
  }
  canLoad(): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): boolean {
    const userData = localStorage.getItem('User');
    if (userData) {
      return true;
    }
    this.route.navigateByUrl('/');
    return false;
  }
}
