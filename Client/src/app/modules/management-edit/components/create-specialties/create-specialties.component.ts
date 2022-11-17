import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { ISaveSpecialtyDiscipline, ISpecialtyDiscipline } from 'src/app/modules/management/models/specialtyDiscipline.model';
import { DisciplinesService } from 'src/app/modules/management/services/disciplines.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';
import { SpecialtyDisciplineService } from 'src/app/modules/management/services/specialty-discipline.service';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-create-specialties',
  templateUrl: './create-specialties.component.html',
  styleUrls: ['./create-specialties.component.css']
})
export class CreateSpecialtiesComponent implements OnInit {

  @Input() specialty: ISpecialty = {} as ISpecialty;

  disciplines: IDiscipline[] = [];

  semestersDisciplines: { disciplineId: number, semester: number }[] = [];

  notfirst: boolean = false;

  constructor(private router: Router, private specialtyService: SpecialtiesService,
    private disciplineService: DisciplinesService, private specialtyDisciplineService: SpecialtyDisciplineService) { }

  ngOnInit(): void {
    this.disciplineService.get().subscribe(res => this.disciplines = res);
  }

  submit(form: NgForm) {
    this.specialtyService.create(form.value)
    .subscribe((res) => {
      this.redirectToManagement();
      this.semestersDisciplines.forEach(element => {
        const specialtyDiscipline: ISaveSpecialtyDiscipline = { specialtyId: res.id, disciplineId: element.disciplineId,
          semester: element.semester };
        this.specialtyDisciplineService.create(specialtyDiscipline).subscribe();
      });
    });

    /*this.specialtyService.update(this.id, form.value)
    .subscribe((s) => {
      this.redirectToManagement();
    });*/
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/specialties");
  }

  isEditRoute() {
    return this.router.url.includes("edit-");
  }
  
  onAddDiscipline(event: Event, value: any, semester: number) {
    if(value != "Search") {
      this.semestersDisciplines.push({ disciplineId: value, semester });
    }
  }

  getFilteredDisciplines(course: number) {
    return this.disciplines.filter(p => !this.semestersDisciplines.some(x => x.disciplineId == p.id) && p.course == course)
      .sort((n1, n2) => (n1 > n2 ? -1 : 1));
  }

  semesterDisciplines(semester: number) {
    var temp: IDiscipline[] = [];

    this.semestersDisciplines.filter(p => p.semester == semester).forEach(element => {
        temp.push(this.disciplines.find(x => x.id == element.disciplineId) || {} as IDiscipline);
    });

    return temp;
  }
  
  deleteDiscipline(disciplineId: number, semester: number) {
    this.semestersDisciplines = this.semestersDisciplines.filter(p => p.disciplineId != disciplineId && p.semester != semester);
  }
}