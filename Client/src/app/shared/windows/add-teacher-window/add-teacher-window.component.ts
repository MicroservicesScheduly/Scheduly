import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';

@Component({
  selector: 'app-add-teacher-window',
  templateUrl: './add-teacher-window.component.html',
  styleUrls: ['./add-teacher-window.component.css']
})
export class AddTeacherWindowComponent {

  title: string;

  message?: string;

  buttons?: IDialogButton[];

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogData,
      private dialogRef: MatDialogRef<AddTeacherWindowComponent>,
  ) {
      this.title = data.title;
      this.message = data.message;
      this.buttons = data.buttons;
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }
}
