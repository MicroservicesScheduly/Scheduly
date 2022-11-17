import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from 'src/app/shared/services/window.service';
import { CreditType } from '../../enums/credit-type.model';
import { ICatalog } from '../../models/catalog.model';
import { IDiscipline } from '../../models/discipline.model';
import { ITeacher } from '../../models/teacher.model';
import { CatalogDisciplineService } from '../../services/catalog-discipline.service';
import { CatalogsService } from '../../services/catalogs.service';
import { DisciplineTeacherService } from '../../services/discipline-teacher.service';
import { DisciplinesService } from '../../services/disciplines.service';
import { NotificationService } from '../../services/notification.service';
import { TeachersService } from '../../services/teachers.service';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit {
  disciplines: IDiscipline[] = [];

  CreditType = CreditType;

  showSelective = true;

  showMandatory = true;

  catalogs: ICatalog[] = [];

  allDisciplines: IDiscipline[] = [];

  lecturersOfCurrentDiscipline: ITeacher[] = [];

  practiciansOfCurrentDiscipline: ITeacher[] = [];

  lecturersOfCurrentDisciplineId: number[] = [];

  practiciansOfCurrentDisciplineId: number[] = [];

  private tempTeacher: ITeacher

  constructor(private disciplinesService: DisciplinesService, private catalogsService: CatalogsService,
    private catalogDisciplineService: CatalogDisciplineService, private router: Router,
    private disciplineTeacherService: DisciplineTeacherService, private teacherService: TeachersService,
    private windowService: WindowService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.disciplinesService.get().subscribe(res => this.allDisciplines = res);

    /*this.disciplinesService.get().subscribe((res) => {
      this.disciplines = res;
      this.disciplines.forEach(element => {
        element.practicians = this.getPracticiansOfDisciplineById(element.id);
      });
    });*/

    this.disciplinesService.get().subscribe(res => this.disciplines = res);
  
    this.catalogsService.get().subscribe(res => this.catalogs = res);
  }

  redirectToEditDiscipline(id: number) {
    this.router.navigateByUrl(`management-edit/edit-discipline/${id}`);
  }

  deleteDiscipline(id: number): void {
    this.disciplinesService.delete(id).subscribe();
    this.disciplines = this.disciplines.filter(p => p.id !== id);
  }

  creditTypeByIndex(index: number): string {
    switch(index)
    {
      case 0:
        return 'Test';
      case 1:
        return 'Exam';
      default:
        return 'Not found';
    }
  }

  changeFilter(selectiveChanged: boolean) {
    if (selectiveChanged) {
      this.showSelective = !this.showSelective;
    } else {
      this.showMandatory = !this.showMandatory;
    }

    this.filter(this.showSelective, this.showMandatory)
  }

  filter(showSelective: boolean, showMandatory: boolean) {
    if (showSelective && !showMandatory) {
      this.disciplinesService.getSelective().subscribe(
        res => this.disciplines = res
      );
    } else if (showMandatory && !showSelective) {
      this.disciplinesService.getMandatory().subscribe(
        res => this.disciplines = res
      );
    } else if (showSelective && showMandatory) {
      this.disciplinesService.get().subscribe(
        res => this.disciplines = res
      );
    } else {
      this.disciplines = [];
    }
  }

  onChangeCatalog(event: Event, catalog: any) {
    /*if (catalog != "All catalogs") {
      this.catalogDisciplineService.getDisciplinesByCatalogId(catalog).subscribe(res => this.disciplines = res);
    }*/

    if (catalog != "All catalogs") {
      this.disciplines = this.allDisciplines.filter(p => p.catalogId == catalog);
    } else {
      this.disciplines = this.allDisciplines;
    }
  }

  getCatalogNameById(id: number) {
    return this.catalogs.find(p => p.id == id)?.name;
  }

  getLecturersOfDisciplineById(disciplineId: number) {
    return this.disciplineTeacherService.getLecturersByDisciplineId(disciplineId).subscribe();
  }

  /*getPracticiansOfDisciplineById(disciplineId: number): number {
    let practicians: ITeacher[] = [];
    this.disciplineTeacherService.getPracticiansByDisciplineId(disciplineId).subscribe((res) => {
      practicians = res;
      console.log(practicians);
    });
    return practicians.length;

    if (this.practiciansOfCurrentDisciplineId) {
      this.lecturersOfCurrentDisciplineId.forEach(element => {
        this.teacherService.getById(element).subscribe((res) => {
          this.tempTeacher = res;
          this.lecturersOfCurrentDiscipline.push(this.tempTeacher);
        });
      });
  }*/

  showLecturersList(discipline: IDiscipline) {
    this.showTeachersList(discipline, true);
  }

  showPracticiansList(discipline: IDiscipline) {
    this.showTeachersList(discipline, false);
  }

  getByName(event: Event, value: any) {
    console.log(value);
    if (value == "") {
      this.disciplines = this.allDisciplines;
    } else if (this.allDisciplines.some(p => p.name.toLowerCase().includes(value.toLowerCase()))) {
      this.disciplines = this.allDisciplines.filter(p => p.name.toLowerCase().includes(value.toLowerCase()));
    }
    else {
      this.notificationService.showErrorMessage("Nothing found by input name");
    }
  }

  private showTeachersList(discipline: IDiscipline, showLecturers: boolean) {
      this.windowService.openShowTeachersListDialog({
          buttons: [
              {
                title: "OK",
                onClickEvent: new EventEmitter<void>(),
              },
          ],
          title: 'Teachers list',
          message: 'Discipline name: ' + discipline.name,
          discipline: discipline,
          showLecturers: showLecturers,
      });
  }
}
