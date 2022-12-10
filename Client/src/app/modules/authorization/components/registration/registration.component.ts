import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { Registration } from 'src/app/shared/models/registration.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationModel: Registration = new Registration('','','');

  eiName: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  register(){
    this.registrationModel.PasswordRepeat = this.registrationModel.Password;

    this.usersService.register(this.registrationModel)
    .subscribe(res1 => {
      this.usersService.createEI({ name: this.eiName}).subscribe(res2 => {
        this.usersService.createUserEI({ eiId: res2.id, userId: res1,
          isAccepted: true, isAdmin: true}).subscribe(res => {
            this.notificationService.showSuccessMessage("You are successfully registered!");
            this.router.navigate(['authorization/sign-in']);
          });
      })
    });
  }

  isAuthenticated(){
    return this.usersService.isAuthenticated();
  }
  
  redirectToManagement() {
    this.router.navigateByUrl("/management/faculties");
  }

}