import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {User} from "../../../models/user";

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css'],
})
export class AdminUserlistComponent implements OnInit {
  users: User[] = this.userService.getUsers();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  onAddUser(userData: Omit<User, 'id'>) {
    this.userService.addUser(userData);
  }

  onRemoveUser(id: number) {
    this.userService.removeUser(id);
  }

  toggleUser(id: number) {
    this.userService.toggleUser(id);
  }

  onRemoveFirstUser() {
    this.userService.removeFirstUser();
  }
}
