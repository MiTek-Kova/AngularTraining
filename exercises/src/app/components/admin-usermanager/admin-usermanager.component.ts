import { Component, Output, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-usermanager',
  templateUrl: './admin-usermanager.component.html',
  styleUrls: ['./admin-usermanager.component.css']
})
export class AdminUsermanagerComponent implements OnInit {

  @ViewChild('username',{static:true}) username:ElementRef;
  @Output() addingUser:EventEmitter<{username:string}> = new EventEmitter<{username:string}>();
  @Output() removingFirstUser:EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addUser()
  {
    this.addingUser.emit({username:this.username.nativeElement.value});
    this.username.nativeElement.value='';
  }

  removeFirstUser()
  {
    this.removingFirstUser.emit();
  }
}
