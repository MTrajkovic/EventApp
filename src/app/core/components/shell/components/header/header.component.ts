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
  isLoggedIn: boolean = false;

  constructor(
    private route: Router,
    private navigationService: NavigationService,
    private AuthorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.AuthorizationService.isAdmin();
    this.isLoggedIn = this.AuthorizationService.isLogedIn();
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
      .subscribe((links) => {
        const displayLinks = [];
        for (let link of links) {
          if (link.name == 'Events') {
            displayLinks.push(link);
          }
          if (link.name == 'Admin' && this.isAdmin) {
            displayLinks.push(link);
          }
          if (link.name == 'Login' && !this.AuthorizationService.isLogedIn()) {
            displayLinks.push(link);
          }
        }
        this.links = displayLinks;
      });
  }
  onClick() {
    this.isAdmin = !this.isAdmin;
  }
}
