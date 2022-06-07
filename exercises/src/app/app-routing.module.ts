import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdminUserlistComponent } from "./components/admin-userlist/admin-userlist.component";
import { ErrorComponent } from "./components/error/error.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./guards/auth.guard";
import { UserListGuard } from "./guards/user-list.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user-list', component: AdminUserlistComponent, canActivate: [AuthGuard], canDeactivate: [UserListGuard] },
  { path: 'user-details/:userId', component: UserDetailsComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/home'},
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
