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

  users:{username:string,status:string}[] = [];

  signedInEvent(value: boolean): void {
    this.signedIn = value;
  }
}
