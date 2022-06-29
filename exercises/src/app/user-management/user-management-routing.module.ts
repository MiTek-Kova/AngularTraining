import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdminUserlistComponent } from "./components/admin-userlist/admin-userlist.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import {AuthGuard} from "../guards/auth.guard";
import {UserListGuard} from "./guards/user-list.guard";

const routes: Routes = [
  { path: 'user-list', component: AdminUserlistComponent, canActivate: [AuthGuard], canDeactivate: [UserListGuard]},
  { path: 'user-details/:userId', component: UserDetailsComponent, canActivate: [AuthGuard]},
  /*{ path: '', redirectTo: '/user-list', pathMatch: 'full'}*/
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
