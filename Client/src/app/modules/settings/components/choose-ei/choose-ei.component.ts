import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConnectableObservable } from 'rxjs';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { EI, UserEI } from 'src/app/shared/models/EI.model';
import { IDialogData } from 'src/app/shared/models/IDialogData.model';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';
import { EIInvitationWindowComponent } from 'src/app/shared/windows/ei-invitation-window/ei-invitation-window.component';

@Component({
  selector: 'app-choose-ei',
  templateUrl: './choose-ei.component.html',
  styleUrls: ['./choose-ei.component.css']
})
export class ChooseEIComponent implements OnInit {

  eis: EI[] = [];

  selectedEIToTeamView: EI;

  eiTeamMembers: {user: User,  isAdmin: boolean, isAccepted: boolean, isAnswered: boolean, id: number }[] = [];

  @Output() newItemEvent = new EventEmitter<EI>();

  private allUsers: User[] = [];

  private allUserEIs: UserEI[] = [];

  constructor(private userService: UsersService, private dialog: MatDialog, private notificationService: NotificationService,) { }

  ngOnInit(): void {
    this.eis = localStorage.getItem('userEIs') ?
      JSON.parse(localStorage.getItem('userEIs') as string) : 
      [];

    this.selectedEIToTeamView = this.eis[0];

    this.userService.get().subscribe(res => this.allUsers = res);

    this.userService.getAllUserEis().subscribe(res => this.allUserEIs = res);

    this.userService.getAllUserEisFullInfoByEIId(this.eis[0].id).subscribe(res => {
      res.forEach(element => {
        this.eiTeamMembers.push({ user: element.user ? element.user : {} as User,  isAdmin: element.isAdmin,
          isAccepted: element.isAccepted, isAnswered: element.isAnswered, id: element.id  });
      });
    });
  }

  deleteMember(value: {user: User,  isAdmin: boolean, isAccepted: boolean, isAnswered: boolean, id: number }) {
    this.userService.deleteUserEI(value.id).subscribe(res => {
      window.location.reload();
    });
  }

  isActiveEI(ei: EI) {
    return { 'active-ei': this.selectedEIToTeamView.id == ei.id };
  }

  getTeamMembers() {
    return this.eiTeamMembers.filter(p => p.isAnswered && p.isAccepted);
  }

  getRejectedMembers() {
    return this.eiTeamMembers.filter(p => p.isAnswered && !p.isAccepted);
  }

  getWaitingMembers() {
    return this.eiTeamMembers.filter(p => !p.isAnswered && !p.isAccepted);
  }

  createInvitation() {
    const currentUser = this.userService.user;
    if (this.eiTeamMembers.filter(p => p.user.id == currentUser.id)[0].isAdmin) {
      let data: IDialogData = {
        buttons: [
            {
              title: "Cancel",
              onClickEvent: new EventEmitter<void>(),
            },
        ],
        title: 'Create Invitation',
        message: 'Enter user email',
        eiId: this.selectedEIToTeamView.id,
        eiName: this.selectedEIToTeamView.name
      };
  
      this.dialog
        .open(EIInvitationWindowComponent, {
            data,
            disableClose: true,
        })
        .afterClosed().subscribe();
    } else {
      this.notificationService.showErrorMessage("Only EI admin can send invitations!");
    }
    
  }

  resendInvitation(email: string) {
    const userWithThisEmail = this.allUsers.filter(p => p.email == email)[0];

    const userEIIdToUpdate = this.allUserEIs.filter(o => o.eiId == this.selectedEIToTeamView.id &&
      o.userId == userWithThisEmail.id && o.isAnswered)[0];

    this.userService.updateUserEI(userEIIdToUpdate.id, { eiId: this.selectedEIToTeamView.id, userId: userWithThisEmail.id,
      isAccepted: false, isAdmin: false, isAnswered: false, userEmailWhoSendInvite: email, id: userEIIdToUpdate.id })
      .subscribe(res => {
        this.userService.sendInvitationEmail({ eiId: this.selectedEIToTeamView.id, eiName: this.selectedEIToTeamView.name,
          userToAdd: email, userWantsToAdd: this.userService.user.email }).subscribe(res => {
            this.notificationService.showInfoMessage("User successfully received an invitation again!");
          })
      });
  }

  onChangeEI(value: EI) {
    this.selectedEIToTeamView = value;
    this.newItemEvent.emit(value);
  }

}