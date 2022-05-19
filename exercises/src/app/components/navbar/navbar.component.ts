import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output("signedInEvent")
  signedInEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  signedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.signedIn = !this.signedIn;
    this.signedInEvent.emit(this.signedIn);
  }
}
