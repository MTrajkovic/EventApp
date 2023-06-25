import { UserService } from './../../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { Role } from 'src/app/shared/models/role.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  arePasswordsEqual?: boolean = false;

  private userID?: number;

  registrationForm = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z]+$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-zA-Z]+$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[^\s]+$/),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    {
      validators: this.isPasswordMatched.bind(this),
    }
  );

  constructor(
    private authorization: AuthorizationService,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getLastUserID();
  }

  onRegister(): void {
    const user: User = {
      id: this.userID,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      role: Role.User,
      currentCreation: new Date().toISOString(),
    };

    this.authorization
      .register(user)
      .pipe(take(1))
      .subscribe(() =>
        this._snackBar.open('Successfully registered', 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        })
      );
  }

  private isPasswordMatched(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    if (password !== confirmPassword) {
      this.arePasswordsEqual = true;
    } else {
      this.arePasswordsEqual = false;
    }
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  private getLastUserID() {
    this.userService
      .getAll()
      .pipe(take(1))
      .subscribe((users: User[]) => {
        this.userID = users[users.length - 1].id + 1;
      });
  }
}
