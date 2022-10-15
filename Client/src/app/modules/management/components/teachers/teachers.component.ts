import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[]=[];

  constructor() { }

  ngOnInit(): void {
    this.teachers = [
      { Id: 0, Name: "Tolmachov Anton Mykhailovych"},
      { Id: 1, Name: "Koval Vadym Yuriyovich"},
      { Id: 2, Name: "Gusak Mykhailo Alexandrovich"},
      { Id: 3, Name: "Vasyliv Boghdan Petrovich"}
    ];
  }

}
