import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/shared/services/window.service';
import { IDiscipline } from '../../models/discipline.model';
import { ITeacher } from '../../models/teacher.model';
import { DisciplineTeacherService } from '../../services/discipline-teacher.service';
import { DisciplinesService } from '../../services/disciplines.service';
import { NotificationService } from '../../services/notification.service';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers: ITeacher[] = [];

  allTeachers: ITeacher[] = [];

  private disciplines: { discipline: IDiscipline, teacherId: number}[] = [];

  constructor(private teachersService: TeachersService, private router: Router,
    private windowService: WindowService, private disciplineTeachersService: DisciplineTeacherService,
    private disciplineService: DisciplinesService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.teachersService.get().subscribe(res => this.teachers = res);

    this.teachersService.get().subscribe(res => this.allTeachers = res);

    var teacherId: number;

    this.disciplineTeachersService.get().subscribe((res) => {
      res.forEach(element => {
        teacherId = element.teacherId;
        this.disciplineService.getById(element.disciplineId).subscribe((res) => {
          this.disciplines.push({ discipline: res, teacherId: teacherId });
        });
      });
    })
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

  showDisciplinesList(teacher: ITeacher) {
    this.windowService.openShowDisciplinesListDialog({
        buttons: [
            {
              title: "OK",
              onClickEvent: new EventEmitter<void>(),
            },
        ],
        title: 'Disciplines list',
        message: `Teacher name:\n${teacher.name} ${teacher.surname} ${teacher.patronymic}`,
        teacher: teacher,
        disciplinesOfTeacher: this.disciplines.filter(p => p.teacherId == teacher.id).map(i => i.discipline)
    });
  }

  getByName(event: Event, value: any) {
    if (value == "") {
      this.teachers = this.allTeachers;
    } else if (this.allTeachers.some(p => p.name.toLowerCase().includes(value.toLowerCase()))) {
      this.teachers = this.allTeachers.filter(p => p.name.toLowerCase().includes(value.toLowerCase()));
    }
    else {
      this.notificationService.showErrorMessage("Nothing found by input name");
    }
  }
}
