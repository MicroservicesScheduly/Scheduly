import { Component, OnInit } from '@angular/core';
import { Faculty } from '../../models/faculty.model';
import { FacultyService } from '../../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[]=[];

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.facultyService.get().subscribe(res => this.faculties = res);
  }

}