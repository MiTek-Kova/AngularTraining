import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ErrorComponent } from "./components/error/error.component";
import { AuthGuard } from "./guards/auth.guard";
import { HomeComponent } from "./components/home/home.component";
import {SignInComponent} from "./components/sign-in/sign-in.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)},
  { path: 'register', loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'sign-in', component: SignInComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
