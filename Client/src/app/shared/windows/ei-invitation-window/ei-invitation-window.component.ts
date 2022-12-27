import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { UserEI } from '../../models/EI.model';
import { IDialogData } from '../../models/IDialogData.model';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-ei-invitation-window',
  templateUrl: './ei-invitation-window.component.html',
  styleUrls: ['./ei-invitation-window.component.css']
})
export class EIInvitationWindowComponent implements OnInit {

  email: string = "";

  private allUsers: User[] = [];

  private allUserEIs: UserEI[] = [];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogData,
      private dialogRef: MatDialogRef<EIInvitationWindowComponent>,
      private usersService: UsersService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.usersService.get().subscribe(res => this.allUsers = res);
    this.usersService.getAllUserEis().subscribe(res => this.allUserEIs = res);
  }

  onClick(event: EventEmitter<void>) {
    event?.next();
    this.dialogRef.close(this.email);
  }

  invite() {
    if (this.allUsers.some(p => p.email == this.email)) {
      const userWithThisEmail = this.allUsers.filter(p => p.email == this.email)[0];
      if (this.allUserEIs.some(p => p.eiId == this.data.eiId && p.userId == userWithThisEmail.id)) {
        this.notificationService.showErrorMessage("User with entered email has already received an invitation to this EI!");
      } else {
        if (this.data.eiId && this.data.eiName) {
          this.usersService.createUserEI({ eiId: this.data.eiId, userId: userWithThisEmail.id,
            isAccepted: false, isAdmin: false, isAnswered: false, userEmailWhoSendInvite: this.usersService.user.email })
            .subscribe(res => {
              if (this.data.eiId && this.data.eiName) {
              this.usersService.sendInvitationEmail({ eiId: this.data.eiId, eiName: this.data.eiName,
                userToAdd: this.email, userWantsToAdd: this.usersService.user.email }).subscribe(res => {
                  this.notificationService.showSuccessMessage("User successfully received an invitation!");
                  this.dialogRef.close();
                })
            } } );
        }
      }
    } else {
      this.notificationService.showErrorMessage("No users with entered email. Please try again!");
    }
  }

  changeEmailInput(value: any) {
    this.email = value;
  }
}
