import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared/models/login.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public loginModel: Login= new Login('','');

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService) { }

  ngOnInit(): void {
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/faculties");
  }

  login(){
    this.usersService.login(this.loginModel.Email, this.loginModel.Password).subscribe(
      result => {this.router.navigate(['/management/faculties'])}
    )
  }

  isAuthenticated(){
    return this.usersService.isAuthenticated();
  }

  logout(){
    this.usersService.logout();
  }

}