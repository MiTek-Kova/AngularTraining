import { Injectable } from '@angular/core';
import { Address, Months, User } from '../models/user';

@Injectable()
export class UserService {
  private _users: User[] = [];

  constructor() {}

  hasAnyUsers(): boolean {
    return this._users.length > 0;
  }

  getUsers(): User[] {
    return this._users;
  }

  getUser(id: number) {
    return this._users.find((u) => u.id === id);
  }

  addUser(userDetails: Omit<User, 'id'>) {
    let userId: number;
    if (this._users.length < 1) {
      userId = 1;
    } else {
      const lastIndex = this._users.length - 1;
      const lastUser = this._users[lastIndex];
      userId = lastUser.id + 1;
    }

    this._users.push({
      id: userId,
      ...userDetails,
    });
  }

  removeUser(id: number) {
    const user = this._users.find((u) => u.id === id);
    if (user) this._users.splice(this._users.indexOf(user), 1);
  }

  toggleUser(id: number) {
    const user = this._users.find((u) => u.id === id);
    if (!user) return;

    user.status = user.status === 'active' ? 'inactive' : 'active';
  }

  removeFirstUser() {
    this._users.splice(0, 1);
  }

  updateUser(user: User): boolean {
    let userToUpdate = this._users.find((u) => u.id === user.id);
    if (!userToUpdate) return false;

    userToUpdate.username = user.username;
    userToUpdate.lastname = user.lastname;
    userToUpdate.address = user.address;
    userToUpdate.status = user.status;
    userToUpdate.birthMonth = user.birthMonth;

    return true;
  }
}
