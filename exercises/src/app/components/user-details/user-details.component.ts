import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userId: number;

  constructor(private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const routeParams = this.activatedRouter.snapshot.paramMap;
    this.userId = Number(routeParams.get('userId'));
  }

  goBackToUserList() {
    this.router.navigate(['/user-list']);
  }
}
