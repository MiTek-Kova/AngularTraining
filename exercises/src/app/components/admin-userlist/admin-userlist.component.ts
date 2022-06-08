import { Component, Input, OnInit } from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit {

  users:User[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  onAddUser(userData:{username:string,status:string})
  {
    let userId:number;
    if (this.users.length < 1){
      userId = 1;
    } else {
      const lastIndex = this.users.length-1;
      const lastUser = this.users[lastIndex];
      userId = lastUser.id + 1;
    }

    this.users.push({id: userId, username: userData.username, status: userData.status});
  }

  onRemoveUser(id:number)
  {
    const user = this.users.find(u => u.id === id);
    if (user)
      this.users.splice(this.users.indexOf(user), 1);
  }

  onRemoveFirstUser()
  {
    this.users.splice(0,1);
  }

  toggleUser(index:number)
  {
    if(this.users[index].status === "active")
      this.users[index].status = "inactive";

    else if(this.users[index].status === "inactive")
      this.users[index].status = "active";
  }

}
