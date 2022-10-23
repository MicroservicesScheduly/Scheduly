import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../models/teacher.model';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[]=[];

  constructor(private teachersService: TeachersService) { }

  ngOnInit(): void {
    this.teachersService.get().subscribe(res => this.teachers = res);
  }

}
