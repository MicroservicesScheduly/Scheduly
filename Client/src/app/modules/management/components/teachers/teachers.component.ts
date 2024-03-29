import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
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
    private disciplineService: DisciplinesService, private notificationService: NotificationService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.teachersService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.teachers = res);

    this.teachersService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.allTeachers = res);

    this.disciplineTeachersService.get().subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        this.disciplineService.getById(element.disciplineId).subscribe((res) => {
          this.disciplines.push({ discipline: res, teacherId: element.teacherId });
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
    var teacherUniqueDisciplines: IDiscipline[] = [];

    this.disciplines.filter(p => p.teacherId == teacher.id).map(i => i.discipline).forEach(element => {
      if (!teacherUniqueDisciplines.some(p => p.id == element.id)) {
        teacherUniqueDisciplines.push(element);
      }
    }); 

    this.windowService.openShowDisciplinesListDialog({
        buttons: [
            {
              title: "OK",
              onClickEvent: new EventEmitter<void>(),
            },
        ],
        title: 'Disciplines list',
        message: `${teacher.name} ${teacher.surname} ${teacher.patronymic}`,
        teacher: teacher,
        disciplinesOfTeacher: teacherUniqueDisciplines
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
