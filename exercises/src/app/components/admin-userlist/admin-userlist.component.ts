import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit {

  @Input() user: {username:string};
  
  constructor() {}

  ngOnInit(): void {
  }

  
}
