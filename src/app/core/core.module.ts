import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/shell/components/header/header.component';
import { FooterComponent } from './components/shell/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShellLayoutComponent } from './components/shell/components/shell-layout/shell-layout.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { MaterialModule } from '../shared/material/material.module';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LoginComponent,
  ShellLayoutComponent,
  RegistrationComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
  exports: [...COMPONENTS],
})
export class CoreModule {}
