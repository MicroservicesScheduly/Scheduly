import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { ISubscription } from 'src/app/modules/schedule/models/subscription.model';
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';
import { ISubscribeData } from '../../models/ISubscribeData.model';

@Component({
  selector: 'app-subscribe-window',
  templateUrl: './subscribe-window.component.html',
  styleUrls: ['./subscribe-window.component.css']
})
export class SubscribeWindowComponent implements OnInit {

  email: string = "";

  allSubscriptions: ISubscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ISubscribeData,
  private dialogRef: MatDialogRef<SubscribeWindowComponent>, private scheduleService: ScheduleService,
  private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.scheduleService.getAllSubscriptions().subscribe(res => this.allSubscriptions = res);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  emailIsEmpty() {
    return this.email == "";
  }

  subscribe() {
    const sub: ISubscription = { scheduleId: this.data.scheduleId, email: this.email, semester: this.data.semester };
    if (this.allSubscriptions.some(p => p.email == this.email && p.scheduleId == this.data.scheduleId
      && p.semester == this.data.semester)) {
      this.notificationService.showErrorMessage("This email is already subscribed for this schedule update!")
    } else {
      this.scheduleService.createSubscriptionExternal(sub).subscribe(res => {
        this.notificationService.showSuccessMessage("Email was successfully subscribed for schedule update!")
        this.dialogRef.close();
      })
    }
  }

}
