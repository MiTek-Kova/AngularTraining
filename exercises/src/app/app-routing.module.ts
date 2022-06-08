import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AdminUserlistComponent } from "./components/admin-userlist/admin-userlist.component";
import { ErrorComponent } from "./components/error/error.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user-list', component: AdminUserlistComponent },
  { path: 'user-details/:userId', component: UserDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full '},
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
