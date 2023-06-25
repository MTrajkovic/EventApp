import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { ShellLayoutComponent } from './core/components/shell/components/shell-layout/shell-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegistrationComponent } from './core/components/auth/registration/registration.component';
import { EventsComponent } from './features/events/components/events/events.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full',
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./features/events/events.module').then(
            (module) => module.EventsModule
          ),
      },
      {
        path: 'admin',
        canLoad: [AdminGuard],
        loadChildren: () =>
          import('./features/event/event.module').then(
            (module) => module.EventModule
          ),
      },
    ],
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
