import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { EI, UserEI } from '../../models/EI.model';
import { IDialogData } from '../../models/IDialogData.model';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-show-invitation-window',
  templateUrl: './show-invitation-window.component.html',
  styleUrls: ['./show-invitation-window.component.css']
})
export class ShowInvitationWindowComponent implements OnInit {

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogData,
      private dialogRef: MatDialogRef<ShowInvitationWindowComponent>,
      private usersService: UsersService, private notificationService: NotificationService) {}

  ngOnInit(): void {
  }

  onClick(event: EventEmitter<void>) {
    event?.next();
    this.dialogRef.close();
  }

  reject() {
    if (this.data.userEI) {
      this.data.userEI.isAnswered = true;
      this.data.userEI.isAccepted = false;
    
      this.usersService.updateUserEI(this.data.userEI?.id, this.data.userEI).subscribe(res => {
        this.notificationService.showInfoMessage("Invitation was rejected!");
        this.dialogRef.close();
      })
    }
  }

  accept() {
    var previousEIs: EI[] = JSON.parse(localStorage.getItem("userEIs") as string);

    if (this.data.userEI) {
      this.data.userEI.isAnswered = true;
      this.data.userEI.isAccepted = true;
    
      this.usersService.updateUserEI(this.data.userEI?.id, this.data.userEI).subscribe(res => {
        this.notificationService.showInfoMessage("Invitation was accepted!");
        this.dialogRef.close();
        this.usersService.getEI().subscribe(allEIs => {
            const newEI = allEIs.filter(o => o.id == this.data.userEI?.eiId)[0];
            if (newEI) {
              previousEIs.push(newEI);
            }
            localStorage.setItem('userEIs', JSON.stringify(previousEIs));
        })
      });
    }
  }

}
