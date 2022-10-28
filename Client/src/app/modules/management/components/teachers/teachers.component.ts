import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITeacher } from '../../models/teacher.model';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: ITeacher[]=[];

  constructor(private teachersService: TeachersService, private router: Router) { }

  ngOnInit(): void {
    this.teachers = [
      { id: 0, name: "Tolmachov Anton Mykhailovych"},
      { id: 1, name: "Koval Vadym Yuriyovich"},
      { id: 2, name: "Gusak Mykhailo Alexandrovich"},
      { id: 3, name: "Vasyliv Boghdan Petrovich"}
    ];
    this.teachersService.get().subscribe(res => this.teachers = res);
  }

  redirectToCreateTeacher() {
    this.router.navigateByUrl("management-edit/create-teacher");
  }

  redirectToEditTeacher(id: number) {
    this.router.navigateByUrl(`management-edit/edit-teacher/${id}`);
  }

}
