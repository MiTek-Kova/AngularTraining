import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {User} from "../../../models/user";

@Component({
  selector: 'app-admin-usermanager',
  templateUrl: './admin-usermanager.component.html',
  styleUrls: ['./admin-usermanager.component.css'],
})
export class AdminUsermanagerComponent implements OnInit {
  @ViewChild('username', { static: true }) username: ElementRef;
  @Output() addingUser = new EventEmitter<Omit<User, 'id'>>();
  @Output() removingFirstUser: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addUser() {
    this.addingUser.emit({
      username: this.username.nativeElement.value,
      status: 'active',
      lastname: '',
      address: { firstLine: '', secondLine: '', postOrZipCode: '' },
      birthMonth: null,
    });
    this.username.nativeElement.value = '';
  }

  removeFirstUser() {
    this.removingFirstUser.emit();
  }
}
