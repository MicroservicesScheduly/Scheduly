import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';

@Component({
  selector: 'app-add-teacher-window',
  templateUrl: './add-teacher-window.component.html',
  styleUrls: ['./add-teacher-window.component.css']
})
export class AddTeacherWindowComponent implements OnInit {

  lecturers: ITeacher[] = [{ id: 2, name: "Lecturer 2"}, { id: 3, name: "Lecturer 3"}, { id: 4, name: "Lecturer 4"}];

  practicians: ITeacher[] = [{ id: 1, name: "Practician 1"}, { id: 2, name: "Practician 2"},
  { id: 3, name: "Koval Vadym Yuriyovich"}, { id: 4, name: "Practician 4"}];

  allLecturers: ITeacher[] = [{ id: 1, name: "Lecturer 1"}, { id: 2, name: "Lecturer 2"},
  { id: 3, name: "Lecturer 3"}, { id: 4, name: "Lecturer 4"}];

  allPracticians: ITeacher[] = [{ id: 1, name: "Practician 1"}, { id: 2, name: "Practician 2"},
  { id: 3, name: "Koval Vadym Yuriyovich"}, { id: 4, name: "Practician 4"}, { id: 5, name: "Practician 5"}];


  availableLecturers: ITeacher[];

  availablePracticians: ITeacher[];
  
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogData,
      private dialogRef: MatDialogRef<AddTeacherWindowComponent>,
  ) {}

  ngOnInit(): void {
    this.availableLecturers = this.allLecturers.filter(p => !this.lecturers.some(m => m.id == p.id));
    this.availablePracticians = this.allPracticians.filter(p => !this.practicians.some(m => m.id == p.id));
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }

  addTeacherToList(asLecturer: boolean = true, teacher: ITeacher) {
    if (asLecturer) {
      this.lecturers = [...this.lecturers, teacher];
    }
    else {
      this.practicians = [...this.practicians, teacher];
    }
    this.dialogRef.close();
  }
}
