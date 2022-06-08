import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../models/user";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user?: User;

  constructor(private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.activatedRouter.snapshot.paramMap;
    const userId = Number(routeParams.get('userId'));

    this.activatedRouter.queryParams.subscribe(params => {
      this.user = {
        id: userId,
        username: params['name'],
        status: params['status']
      };
    })
  }

  goBackToUserList() {
    this.router.navigate(['/user-list']);
  }
}
