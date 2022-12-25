import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { ISaveSpecialty, ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { ISaveSpecialtyDiscipline, ISpecialtyDiscipline } from 'src/app/modules/management/models/specialtyDiscipline.model';
import { DisciplinesService } from 'src/app/modules/management/services/disciplines.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';
import { SpecialtyDisciplineService } from 'src/app/modules/management/services/specialty-discipline.service';
import { UsersService } from 'src/app/shared/services/users.service';
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

  private specialties: ISpecialty[] = [];

  constructor(private router: Router, private specialtyService: SpecialtiesService,
    private disciplineService: DisciplinesService, private specialtyDisciplineService: SpecialtyDisciplineService,
    private usersService: UsersService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.disciplineService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.disciplines = res);

    this.specialtyService.get().subscribe(res => this.specialties = res);
  }

  submit(form: NgForm) {
    if (this.specialties.some(p => p.name == form.value["name"])) {
      this.notificationService.showErrorMessage("Specialty with this name already exists!");
    } else if(this.specialties.some(p => p.cipher == form.value["cipher"])) {
      this.notificationService.showErrorMessage("Specialty with this cipher already exists!");
    }
    else {
    var specialty: ISaveSpecialty = { cipher: form.value["cipher"], description: form.value["description"],
    name: form.value["name"], universityId: JSON.parse(localStorage.getItem('selectedEI') as string) };

    this.specialtyService.create(specialty)
    .subscribe((res) => {
      this.redirectToManagement();
      this.semestersDisciplines.forEach(element => {
        const specialtyDiscipline: ISaveSpecialtyDiscipline = { specialtyId: res.id, disciplineId: element.disciplineId,
          semester: element.semester };
        this.specialtyDisciplineService.create(specialtyDiscipline).subscribe();
      });
    });
  }
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