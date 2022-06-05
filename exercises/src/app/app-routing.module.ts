import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdminUserlistComponent } from "./components/admin-userlist/admin-userlist.component";
import { ErrorComponent } from "./components/error/error.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";

const routes: Routes = [
  { path: 'user-list', component: AdminUserlistComponent },
  { path: 'user-details/:userId', component: UserDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: '/user-list'},
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
