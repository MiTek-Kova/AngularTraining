import { Component, Output, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import {Address, Months} from "../../models/user";

@Component({
  selector: 'app-admin-usermanager',
  templateUrl: './admin-usermanager.component.html',
  styleUrls: ['./admin-usermanager.component.css']
})
export class AdminUsermanagerComponent implements OnInit {

  @ViewChild('username',{static:true}) username:ElementRef;
  @Output() addingUser:EventEmitter<{username:string,status:string,lastName:string,address:Address,birthMonth:Months|null}> = new EventEmitter<{username:string,status:string,lastName:string,address:Address,birthMonth:Months|null}>();
  @Output() removingFirstUser:EventEmitter<null> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addUser()
  {
    this.addingUser.emit({username:this.username.nativeElement.value, status:'active', lastName: "", address: {firstLine: "", secondLine: "", postOrZipCode: ""}, birthMonth: null});
    this.username.nativeElement.value='';
  }

  removeFirstUser()
  {
    this.removingFirstUser.emit();
  }
}
