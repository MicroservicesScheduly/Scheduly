import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { Registration } from 'src/app/shared/models/registration.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registrationModel: Registration = new Registration('','','');

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService) { }

  ngOnInit(): void {
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/faculties");
  }

  register(){
    this.usersService.register(this.registrationModel)
    .pipe(concatMap(()=>this.usersService.login(this.registrationModel.Email, this.registrationModel.Password)))
    .subscribe(
      result => {this.router.navigate(['/'])}
    );
  }

  isAuthenticated(){
    return this.usersService.isAuthenticated();
  }

}