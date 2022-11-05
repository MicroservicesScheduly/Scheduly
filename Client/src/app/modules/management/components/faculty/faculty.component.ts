import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Faculty } from '../../models/faculty.model';
import { FacultyService } from '../../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[] = [];

  constructor(private facultyService: FacultyService, private router: Router) { }

  ngOnInit(): void {
    var newFaculty: Faculty = {} as Faculty;
    this.facultyService.get().subscribe(res => {
      this.faculties = res;
    });
  }

  redirectToEditFaculty(id: number) {
    this.router.navigateByUrl(`management-edit/edit-faculty/${id}`);
  }

  deleteFaculty(id: number): void {
    this.facultyService.delete(id).subscribe();
    this.faculties = this.faculties.filter(p => p.id !== id);
  }

}