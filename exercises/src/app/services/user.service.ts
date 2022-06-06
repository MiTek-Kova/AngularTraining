import { Injectable } from '@angular/core';
import { User } from "../models/user";

@Injectable()
export class UserService {

  private _users: User[] = [];

  constructor() { }

  get users() : User[] {
    return this._users;
  }

  addUser(username:string, status:string) {
    let userId:number;
    if (this._users.length < 1){
      userId = 1;
    } else {
      const lastIndex = this._users.length-1;
      const lastUser = this._users[lastIndex];
      userId = lastUser.id + 1;
    }

    this._users.push({id: userId, username: username, status: status});
  }

  removeFirstUser()
  {
    this._users.splice(0,1);
  }

  toggleUser(id:number)
  {
    if(!this._users.some(u => u.id === id))
      return;

    if(this._users.find(u => u.id === id)!.status === "active")
      this._users.find(u => u.id === id)!.status = "inactive";

    else if(this._users.find(u => u.id === id)!.status === "inactive")
      this._users.find(u => u.id === id)!.status = "active";
  }
}
