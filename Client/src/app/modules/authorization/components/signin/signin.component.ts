import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { Login } from 'src/app/shared/models/login.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginModel: Login = new Login('','');

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  login(){
    console.log("login");
    this.usersService.login(this.loginModel.Email, this.loginModel.Password).subscribe(
      result => {
        this.notificationService.showSuccessMessage("You are successfully logged in!");
        this.router.navigate(['/management/faculties']);
      })
  }

  isAuthenticated(){
    return this.usersService.isAuthenticated();
  }

  logout(){
    this.usersService.logout();
    this.router.navigate(['/authorization/sign-in']);
  }
  
  redirectToManagement() {
    this.router.navigateByUrl("/management/faculties");
  }

}