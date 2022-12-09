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
  registrationModel: Registration = new Registration('','','');

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService) { }

  ngOnInit(): void {
  }

  register(){
    this.registrationModel.PasswordRepeat = this.registrationModel.Password;

    console.log(this.registrationModel);

    this.usersService.register(this.registrationModel)
    .subscribe(
      result => { this.router.navigate(['/'])}
    );
  }

  isAuthenticated(){
    return this.usersService.isAuthenticated();
  }
  
  redirectToManagement() {
    this.router.navigateByUrl("/management/faculties");
  }

}