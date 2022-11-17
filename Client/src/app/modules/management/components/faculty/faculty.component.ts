import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateDisciplinesComponent } from 'src/app/modules/management-edit/components/create-disciplines/create-disciplines.component';
import { WindowService } from 'src/app/shared/services/window.service';
import { Faculty } from '../../models/faculty.model';
import { FacultyService } from '../../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  faculties: Faculty[] = [];

  constructor(private facultyService: FacultyService, private router: Router,
    private windowService: WindowService) { }

  ngOnInit(): void {
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

  getByName(value: any) {
    console.log(value);
  }

  showDisciplinesList(faculty: Faculty) {
    this.windowService.openShowFacultyDisciplinesListDialog({
        buttons: [
            {
              title: "OK",
              onClickEvent: new EventEmitter<void>(),
            },
        ],
        title: 'Disciplines list',
        message: `Faculty name:\n${faculty.name}`,
        faculty: faculty,
    });
  }

  showTeachersList(faculty: Faculty) {
    this.windowService.openShowFacultyTeachersListDialog({
        buttons: [
            {
              title: "OK",
              onClickEvent: new EventEmitter<void>(),
            },
        ],
        title: 'Teachers list',
        message: `Faculty name:\n${faculty.name}`,
        faculty: faculty,
    });
  }

  showSpecialtiesList(faculty: Faculty) {
    this.windowService.openShowFacultySpecialtiesListDialog({
        buttons: [
            {
              title: "OK",
              onClickEvent: new EventEmitter<void>(),
            },
        ],
        title: 'Specialties list',
        message: `Faculty name:\n${faculty.name}`,
        faculty: faculty,
    });
  }
}