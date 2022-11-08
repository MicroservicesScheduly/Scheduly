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
    this.teachersService.get().subscribe(res => this.teachers = res);
  }

  redirectToCreateTeacher() {
    this.router.navigateByUrl("management-edit/create-teacher");
  }

  redirectToEditTeacher(id: number) {
    this.router.navigateByUrl(`management-edit/edit-teacher/${id}`);
  }

  deleteTeacher(id: number): void {
    this.teachersService.delete(id).subscribe();
    this.teachers = this.teachers.filter(p => p.id !== id);
  }
}
