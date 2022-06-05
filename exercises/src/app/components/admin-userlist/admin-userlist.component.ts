import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit {

  @Input() users:{username:string,status:string}[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  onAddUser(userData:{username:string,status:string})
  {
    this.users.push(userData);
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
