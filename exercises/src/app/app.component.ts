import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exercises';
  signedIn: boolean = false;
  name: string = "Brad";

  users:{username:string}[] = [];

  signedInEvent(value: boolean): void {
    this.signedIn = value;
  }

  onAddUser(userData:{username:string})
  {
    this.users.push(userData);
  }

  onRemoveFirstUser()
  {
    this.users.splice(0,1);
  }
}
