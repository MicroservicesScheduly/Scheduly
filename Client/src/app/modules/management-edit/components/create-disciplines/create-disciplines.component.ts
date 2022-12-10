import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeachersComponent } from 'src/app/modules/management/components/teachers/teachers.component';
import { CreditType } from 'src/app/modules/management/enums/credit-type.model';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { ICatalogDiscipline, ISaveCatalogDiscipline } from 'src/app/modules/management/models/catalogDiscipline.model';
import { IDiscipline, ISaveDiscipline } from 'src/app/modules/management/models/discipline.model';
import { ISaveDisciplineTeacher } from 'src/app/modules/management/models/disciplineTeacher.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { CatalogDisciplineService } from 'src/app/modules/management/services/catalog-discipline.service';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { DisciplineTeacherService } from 'src/app/modules/management/services/discipline-teacher.service';
import { DisciplinesService } from 'src/app/modules/management/services/disciplines.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { TeachersService } from 'src/app/modules/management/services/teachers.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { WindowService } from 'src/app/shared/services/window.service';
import { ChangeCatalogWindowComponent } from 'src/app/shared/windows/change-catalog-window/change-catalog-window.component';
import { getCatalogs } from '../../catalogs.helper';

@Component({
  selector: 'app-create-disciplines',
  templateUrl: './create-disciplines.component.html',
  styleUrls: ['./create-disciplines.component.css']
})
export class CreateDisciplinesComponent implements OnInit {

  @Input() discipline: IDiscipline = {} as IDiscipline;

  creditTypes = Object.values(CreditType);

  /*static addedId: number = 1;*/

  catalogs: ICatalog[] = [];

  catalogChangeDialogRef: MatDialogRef<ChangeCatalogWindowComponent>;

  selectedCatalogId: number;

  lecturersId: number[] = [];

  practiciansId: number[] = [];

  allTeachers: ITeacher[] = [];

  lecturers: ITeacher[] = [];

  practicians: ITeacher[] = [];

  @ViewChild("takeInputLe", {static: false}) InputVarLe: ElementRef;

  @ViewChild("takeInputPr", {static: false}) InputVarPr: ElementRef;


  private tch: ITeacher = {} as ITeacher;

  constructor(private router: Router, private windowService: WindowService,
    private disciplineService: DisciplinesService, private notificationService: NotificationService,
    private catalogsService: CatalogsService, private catalogDisciplineService: CatalogDisciplineService,
    private teacherService: TeachersService, private disciplineTeacherService: DisciplineTeacherService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    if (!this.discipline.creditType) {
      this.discipline.creditType = 0;
    }

    this.catalogsService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.catalogs = res);
    this.teacherService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.allTeachers = res);

    this.disciplineTeacherService.getLecturersByDisciplineId(this.discipline.id).subscribe(res =>
      this.lecturers = res);

    this.disciplineTeacherService.getPracticiansByDisciplineId(this.discipline.id).subscribe(res =>
      this.practicians = res);

  }

  submit(form: NgForm) {
    var discipline: ISaveDiscipline = { name: form.value["name"], description: form.value["description"],
        course: form.value["course"], creditType: form.value["creditType"] == "Test" ? 0 : 1, hours: form.value["hours"], 
        isSelective: form.value["isSelective"], catalogId: this.selectedCatalogId ? this.selectedCatalogId : undefined,
        universityId: JSON.parse(localStorage.getItem('selectedEI') as string) };

    /*this.disciplineService.create(discipline)
    .subscribe((res) => {
      const catalogDiscipline: ISaveCatalogDiscipline = { catalogId: this.selectedCatalogId,
        disciplineId: res.id };
      this.catalogDisciplineService.create(catalogDiscipline)
      .subscribe(() => {
        if (this.lecturers) {
          this.lecturers.forEach(element => {
            const disciplineTeacher: ISaveDisciplineTeacher = { teacherId: element.id, disciplineId: res.id,
              isLecturer: true };
            this.disciplineTeacherService.create(disciplineTeacher).subscribe();
          });
        }

        if (this.practicians) {
          this.practicians.forEach(element => {
            const disciplineTeacher: ISaveDisciplineTeacher = { teacherId: element.id, disciplineId: res.id,
              isLecturer: false };
            this.disciplineTeacherService.create(disciplineTeacher).subscribe();
          });
        }

        this.redirectToManagement();
      });
    });*/

    if (discipline.isSelective) {
        this.disciplineService.create(discipline)
        .subscribe((res) => {
          const catalogDiscipline: ISaveCatalogDiscipline = { catalogId: this.selectedCatalogId,
            disciplineId: res.id };
          this.catalogDisciplineService.create(catalogDiscipline)
          .subscribe(() => {
            if (this.lecturers) {
              this.lecturers.forEach(element => {
                const disciplineTeacher: ISaveDisciplineTeacher = { teacherId: element.id, disciplineId: res.id,
                  isLecturer: true };
                this.disciplineTeacherService.create(disciplineTeacher).subscribe();
              });
            }

            if (this.practicians) {
              this.practicians.forEach(element => {
                const disciplineTeacher: ISaveDisciplineTeacher = { teacherId: element.id, disciplineId: res.id,
                  isLecturer: false };
                this.disciplineTeacherService.create(disciplineTeacher).subscribe();
              });
            }

          this.redirectToManagement();
        });
      });
    } else {
      this.disciplineService.create(discipline)
      .subscribe((res) => {
          if (this.lecturers) {
            this.lecturers.forEach(element => {
              const disciplineTeacher: ISaveDisciplineTeacher = { teacherId: element.id, disciplineId: res.id,
                isLecturer: true };
              this.disciplineTeacherService.create(disciplineTeacher).subscribe();
            });
          }

          if (this.practicians) {
            this.practicians.forEach(element => {
              const disciplineTeacher: ISaveDisciplineTeacher = { teacherId: element.id, disciplineId: res.id,
                isLecturer: false };
              this.disciplineTeacherService.create(disciplineTeacher).subscribe();
            });
          }

        this.redirectToManagement();
      });
    }
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/disciplines");
  }

  deleteTeacher(id: number, isLecturer: boolean) {
    if (isLecturer) {
      this.lecturers = this.lecturers.filter(p => p.id != id);
    }
    else {
      this.practicians = this.practicians.filter(p => p.id != id);
    }
  }

  addTeacher(addAsLecturer: boolean = true) {
      this.windowService.openAddTeacherDialog({
          buttons: [
              {
                title: "Cancel",
                onClickEvent: new EventEmitter<void>(),
              },
          ],
          title: 'Add Teacher',
          message: addAsLecturer ? 'as a lecturer' : 'as a practician',
          isLecturerAdded: addAsLecturer,
      });
  }

  addCatalog() {
    this.windowService.openAddCatalogDialog({
      buttons: [
          {
            title: "Cancel",
            onClickEvent: new EventEmitter<void>(),
          },
      ],
      title: 'Add Catalog',
      message: 'Enter name for the new catalog'
    });

    this.catalogsService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.catalogs = res);
  }

  changeCatalog() {
    if (this.catalogs.length) {
      this.windowService.openChangeCatalogDialog({
        buttons: [
            {
              title: "Cancel",
              onClickEvent: new EventEmitter<void>(),
            },
        ],
        title: 'Change Catalog',
        message: 'Choose catalog for the discipline',
        disciplineForCatalog: this.discipline,
      });
    } else {
      this.notificationService.showWarningMessage("Please add at least one catalog by '+' button");
    }

  }

  isEditRoute() {
    return this.router.url.includes("edit-");
  }

  getCatalogNameById(id: number) {
    var catalogName: string = "";
    this.catalogsService.getById(id).subscribe(res => catalogName = res.name)
    return catalogName;
  }

  checkCatalog(event: Event, value: any) {
    if (value != "None") {
      this.selectedCatalogId = value;
    }
  }

  onAddTeacher(event: Event, value: any, asLecturer: boolean) {
    if (value != "Select teacher to add") {
      if (asLecturer) {
        this.teacherService.getById(value).subscribe(res => this.lecturers.push(res));
        this.InputVarLe.nativeElement.value = "Select teacher to add";
      } else {
        this.teacherService.getById(value).subscribe(res => this.practicians.push(res));
        this.InputVarPr.nativeElement.value = "Select teacher to add";
      }
    }
  }

  getFilteredTeachers(lecturers: boolean) {
    if(lecturers) {
      return this.allTeachers.filter(p => !this.lecturers.some(x => x.id == p.id));
    } else {
      return this.allTeachers.filter(p => !this.practicians.some(x => x.id == p.id));
    }
  }
  
}
