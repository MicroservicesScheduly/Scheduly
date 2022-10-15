import { Component, OnInit } from '@angular/core';
import { Faculty } from '../../models/faculty.model';
//import { FacultyService } from '../../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[]=[];

  constructor() { }

  ngOnInit(): void {
    this.faculties = [
      { Id: 1, Name: 'Faculty 1', Description: "Faculty 1 Dription. Faculty 1 Description. Faulty 1 dssd Desription", Disciplines: 103, Teachers: 23, Specialties: 3},
      { Id: 2, Name: 'Faculty 2', Description: "Faculty 2 Dription. Faculty 2 Description. Faulty 2 dssd Desription", Disciplines: 83, Teachers: 17, Specialties: 1},
      { Id: 3, Name: 'Faculty 3', Description: "Faculty 3 Dription. Faculty 3 Description. Faulty 3 dssd Desription", Disciplines: 92, Teachers: 41, Specialties: 7}
    ];
  }

}