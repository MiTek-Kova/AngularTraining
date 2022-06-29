import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";
import {Address, MyUserApiClient, UserDto} from "../../api/myUserApi.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class UserService {
  private _users: User[] = [];
  private apiClient: MyUserApiClient;

  constructor(httpClient: HttpClient) {
    // If we have an API location, use that rather than just in-memory
    if (environment.apiLocation) {
      this.apiClient = new MyUserApiClient(httpClient, environment.apiLocation);
      this.apiClient.getUsers().subscribe(users => {        
        for (let user of users) {
          let adaptedUser = UserService.convertDtoToDomain(user);
          if (!adaptedUser)
            continue;
          this._users.push(adaptedUser);
        }
      });
    }
  }
  
  private static convertDtoToDomain(user: UserDto): User | null {
    // We need a complete user
    if (!user.userId || !user.username || !user.status || user.lastName === undefined || !user.address
       || user.address.firstLine === undefined || user.address.secondLine === undefined || user.address.postOrZipCode === undefined || user.birthMonth === undefined)
      return null;

    return {
      id: user.userId,
      username: user.username,
      status: user.status,
      lastname: user.lastName,
      address: {
        firstLine: user.address?.firstLine,
        secondLine: user.address?.secondLine,
        postOrZipCode: user.address?.postOrZipCode
      },
      birthMonth: user.birthMonth
    };
  }
  
  private static convertDomainToDto(user: User): UserDto {
    return new UserDto({
      userId: user.id,
      username: user.username,
      status: user.status,
      lastName: user.lastname,
      address: new Address({
        firstLine: user.address?.firstLine,
        secondLine: user.address?.secondLine,
        postOrZipCode: user.address?.postOrZipCode
      }),
      birthMonth: user.birthMonth ? user.birthMonth : undefined
    });
  }

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

    let newUser = {
      id: userId,
      ...userDetails,
    };
    this._users.push(newUser);
    
    if (this.apiClient) 
      this.apiClient.createUser(UserService.convertDomainToDto(newUser)).subscribe(() => {});
  }

  removeUser(id: number) {
    const user = this._users.find((u) => u.id === id);
    if (user) this._users.splice(this._users.indexOf(user), 1);

    if (this.apiClient) 
      this.apiClient.deleteUser(id).subscribe(() => {});
  }

  toggleUser(id: number) {
    const user = this._users.find((u) => u.id === id);
    if (!user) return;

    user.status = user.status === 'active' ? 'inactive' : 'active';

    if (this.apiClient)
      this.apiClient.updateUser(UserService.convertDomainToDto(user)).subscribe(() => {});
  }

  removeFirstUser() {
    let id = this._users[0].id;
    this._users.splice(0, 1);

    if (this.apiClient)
      this.apiClient.deleteUser(id).subscribe(() => {});
  }

  updateUser(user: User): boolean {
    let userToUpdate = this._users.find((u) => u.id === user.id);
    if (!userToUpdate) return false;

    userToUpdate.username = user.username;
    userToUpdate.lastname = user.lastname;
    userToUpdate.address = user.address;
    userToUpdate.status = user.status;
    userToUpdate.birthMonth = user.birthMonth;

    if (this.apiClient)
      this.apiClient.updateUser(UserService.convertDomainToDto(userToUpdate)).subscribe(() => {});

    return true;
  }
}
