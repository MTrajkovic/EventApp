import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(
    private AuthorizationService: AuthorizationService,
    private Router: Router
  ) {}
  canLoad(): boolean {
    if (this.AuthorizationService.isAdmin()) {
      return true;
    }
    this.Router.navigateByUrl('/');
    return false;
  }
}
