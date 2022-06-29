import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserManagementRoutingModule} from "./user-management-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AdminUserlistComponent} from "./components/admin-userlist/admin-userlist.component";
import {AdminUsermanagerComponent} from "./components/admin-usermanager/admin-usermanager.component";
import {UserService} from "./services/user.service";
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {SelectedUserDirective} from "./directives/selected-user.directive";
import {UserListGuard} from "./guards/user-list.guard";
import {CookieService} from "ngx-cookie-service";

@NgModule({
   declarations: [
      AdminUserlistComponent,
      AdminUsermanagerComponent,
      UserDetailsComponent,
      SelectedUserDirective
   ],
   providers:[
      UserService,
      UserListGuard
   ],
   imports: [
      CommonModule,
      ReactiveFormsModule,
      UserManagementRoutingModule
   ]
})
export class UserManagementModule { }
