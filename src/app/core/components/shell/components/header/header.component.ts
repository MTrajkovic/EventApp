import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { Link } from 'src/app/shared/models/link.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  links?: Link[];

  constructor(
    private route: Router,
    private navigationService: NavigationService,
    private AuthorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.AuthorizationService.isAdmin();
    this.getAllLinks();
  }

  logoutUser(): void {
    localStorage.removeItem('User');
    localStorage.removeItem('Role');
    this.route.navigateByUrl('/login');
  }

  private getAllLinks(): void {
    this.navigationService
      .getAll()
      .pipe(take(1))
      .subscribe((links) => (this.links = links));
  }
  onClick() {
    this.isAdmin = !this.isAdmin;
  }
}
