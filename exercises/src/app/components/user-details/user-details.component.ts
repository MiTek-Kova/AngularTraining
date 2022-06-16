import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {Months, User} from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user?: User;
  
  isSubmitted: boolean;

  constructor(private activatedRouter: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    const routeParams = this.activatedRouter.snapshot.paramMap;
    const userId = Number(routeParams.get('userId'));
    this.isSubmitted = false;
    
    // We only have one layer deep, so a shallow copy here is ok
    this.user = Object.assign({}, this.userService.getUser(userId));
  }

  goBackToUserList(): void {
    this.router.navigate(['/user-list']);
  }
  
  toggleStatus(): void {
    if (!this.user?.status)
      return;
    
    this.user.status = this.user.status == "active" ? "inactive" : "active";
  }

  public possibleMonths(): Array<string> {
    const keys = Object.keys(Months);
    return keys.slice(keys.length / 2);
  }
  
  onSubmit(): void {
    if (!this.user)
      return;
    
    if (!this.userService.updateUser(this.user))
      return;
    
    this.isSubmitted = true;
    setTimeout(() => {this.isSubmitted = false}, 1500); // Get rid of submitted after a few seconds
  }
}
