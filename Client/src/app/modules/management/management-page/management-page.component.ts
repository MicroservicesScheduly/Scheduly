import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { WindowService } from 'src/app/shared/services/window.service';
import { IDiscipline } from '../models/discipline.model';
import { ISpecialty } from '../models/specialty.model';
import { ITeacher } from '../models/teacher.model';
import { DisciplinesService } from '../services/disciplines.service';
import { NotificationService } from '../services/notification.service';
import { SpecialtiesService } from '../services/specialties.service';
import { TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.css']
})
export class ManagementPageComponent implements OnInit {
  modelName: string = '';
  editModelUri: string = 'management-edit/';

  private teachers: ITeacher[] = [];
  private disciplines: IDiscipline[] = [];
  private specialties: ISpecialty[] = [];

  constructor(private router: Router, private teachersService: TeachersService,
    private disciplinesService: DisciplinesService, private specialtiesService: SpecialtiesService,
    private notificationService: NotificationService,
    private windowService: WindowService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.teachersService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.teachers = res);
    this.disciplinesService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.disciplines = res);
    this.specialtiesService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.specialties = res);

    switch (this.router.url)
    {
      case '/management/disciplines':
        this.modelName = "Discipline";
        this.editModelUri += 'create-discipline';
        break;
      case '/management/faculties':
        this.modelName = "Faculty";
        this.editModelUri += 'create-faculty';
        break;
      case '/management/teachers':
        this.modelName = "Teacher";
        this.editModelUri += 'create-teacher';
        break;
      case '/management/specialties':
        this.modelName = "Specialty";
        this.editModelUri += 'create-specialty';
        break;
    }
  }

  redirectToCreateModel() {
    if (this.editModelUri != 'management-edit/') {
      switch (this.router.url)
      {
        case '/management/disciplines':
          if (this.teachers.length) {
            this.router.navigateByUrl(this.editModelUri);
          } else {
            this.notificationService.showWarningMessage("Add at least one teacher before discipline creation!");
          }
          break;
        case '/management/faculties':
          if (this.specialties.length) {
            this.router.navigateByUrl(this.editModelUri);
          } else {
            this.notificationService.showWarningMessage("Add at least one specialty before faculty creation!");
          }
          break;
        case '/management/teachers':
          this.router.navigateByUrl(this.editModelUri);
          break;
        case '/management/specialties':
          if (this.disciplines.length) {
            this.router.navigateByUrl(this.editModelUri);
          } else {
            this.notificationService.showWarningMessage("Add at least one discipline before specialty creation!");
          }
          break;
      }
    }
  }

  isFacultiesSection() {
    return { 'active-path': !this.router.url.includes("/management/faculties") };
  }

  isDisciplinesSection() {
    return { 'active-path': !this.router.url.includes("/management/disciplines") };
  }

  isSpecialtiesSection() {
    return { 'active-path': !this.router.url.includes("/management/specialties") };
  }

  isTeachersSection() {
    return { 'active-path': !this.router.url.includes("/management/teachers") };
  }
}
