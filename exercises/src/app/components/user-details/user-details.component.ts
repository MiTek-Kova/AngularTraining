import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user?: User;

  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    const routeParams = this.activatedRouter.snapshot.paramMap;
    const userId = Number(routeParams.get('userId'));
    this.user = this.userService.getUser(userId);
  }

  goBackToUserList() {
    this.router.navigate(['/user-list']);
  }
}
