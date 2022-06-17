import { Component, OnInit } from '@angular/core';
import {Address, Months, User} from "../../models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit {

  users:User[] = this.userService.getUsers();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
  }

  onAddUser(userData:{username:string,status:string,lastName:string,address:Address,birthMonth:Months|null})
  {
    this.userService.addUser(userData.username, userData.status, userData.lastName, userData.address, userData.birthMonth);
  }

  onRemoveUser(id:number)
  {
    this.userService.removeUser(id);
  }

  toggleUser(id:number)
  {
    this.userService.toggleUser(id);
  }

  onRemoveFirstUser()
  {
    this.userService.removeFirstUser();
  }
}
