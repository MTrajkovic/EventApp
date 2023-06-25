import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RegisterUser } from 'src/app/shared/models/register-user.model';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthorizationService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    const user: RegisterUser = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService
      .login(user)
      .pipe(take(1))
      .subscribe((user: User[]) => {
        if (user.length) {
          localStorage.setItem('Role', user[0].role);
          localStorage.setItem(
            'User',
            JSON.stringify({
              firstName: user[0].firstName,
              lastName: user[0].lastName,
              email: user[0].email,
            })
          );

          this._snackBar.open('Welcome', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 2000,
          });

          this.route.navigateByUrl('');
        } else {
          this._snackBar.open('Your email or password are incorrect.', 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
  }
}
