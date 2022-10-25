import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teacher } from 'src/app/modules/management/models/teacher.model';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';

@Component({
  selector: 'app-add-teacher-window',
  templateUrl: './add-teacher-window.component.html',
  styleUrls: ['./add-teacher-window.component.css']
})
export class AddTeacherWindowComponent implements OnInit {

  lecturers: Teacher[] = [{ Id: 2, Name: "Lecturer 2"}, { Id: 3, Name: "Lecturer 3"}, { Id: 4, Name: "Lecturer 4"}];

  practicians: Teacher[] = [{ Id: 1, Name: "Practician 1"}, { Id: 2, Name: "Practician 2"},
  { Id: 3, Name: "Koval Vadym Yuriyovich"}, { Id: 4, Name: "Practician 4"}];

  allLecturers: Teacher[] = [{ Id: 1, Name: "Lecturer 1"}, { Id: 2, Name: "Lecturer 2"},
  { Id: 3, Name: "Lecturer 3"}, { Id: 4, Name: "Lecturer 4"}];

  allPracticians: Teacher[] = [{ Id: 1, Name: "Practician 1"}, { Id: 2, Name: "Practician 2"},
  { Id: 3, Name: "Koval Vadym Yuriyovich"}, { Id: 4, Name: "Practician 4"}, { Id: 5, Name: "Practician 5"}];


  availableLecturers: Teacher[];

  availablePracticians: Teacher[];
  
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogData,
      private dialogRef: MatDialogRef<AddTeacherWindowComponent>,
  ) {}

  ngOnInit(): void {
    this.availableLecturers = this.allLecturers.filter(p => !this.lecturers.some(m => m.Id == p.Id));
    this.availablePracticians = this.allPracticians.filter(p => !this.practicians.some(m => m.Id == p.Id));
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }

  addTeacherToList(asLecturer: boolean = true, teacher: Teacher) {
    if (asLecturer) {
      this.lecturers = [...this.lecturers, teacher];
    }
    else {
      this.practicians = [...this.practicians, teacher];
    }
    this.dialogRef.close();
  }
}
