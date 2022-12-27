import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  private allSemesterDisciplines: { disciplineId: number, semester: number }[] = [];

  private allSpecialtyDisciplines: ISpecialtyDiscipline[] = [];

  constructor(private router: Router, private specialtyService: SpecialtiesService,
    private disciplineService: DisciplinesService, private specialtyDisciplineService: SpecialtyDisciplineService,
    private usersService: UsersService, private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.disciplineService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.disciplines = res);

    this.specialtyService.get().subscribe(res => this.specialties = res);
    
    this.route.params.subscribe(params => {
        if (params['id']) {
          this.specialtyDisciplineService.get().subscribe(res => {
            const specialtyDisciplines = res.filter(p => p.specialtyId == params['id']);
            specialtyDisciplines.forEach(element => {
              this.semestersDisciplines.push({ disciplineId: element.disciplineId, semester: element.semester });
              this.allSemesterDisciplines.push({ disciplineId: element.disciplineId, semester: element.semester });
            });
          });
        }
    }); 

    this.specialtyDisciplineService.get().subscribe(res => this.allSpecialtyDisciplines = res);
  }

  submit(form: NgForm) {
    if (this.specialties.some(p => p.name == form.value["name"]) && !this.isEditRoute()) {
      this.notificationService.showErrorMessage("Specialty with this name already exists!");
    } else if (!this.isEditRoute()) {
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
    else {
      var editSpecialty: ISpecialty = { cipher: form.value["cipher"], description: form.value["description"],
        name: form.value["name"], universityId: JSON.parse(localStorage.getItem('selectedEI') as string), id: this.specialty.id };

        const deletedDisciplines: { disciplineId: number, semester: number }[] = this.allSemesterDisciplines
          .filter(o => !this.semestersDisciplines.some(k => k.disciplineId == o.disciplineId && k.semester == o.semester));

        deletedDisciplines.forEach(element => {
          const disc = this.allSpecialtyDisciplines.filter(o =>
              o.disciplineId == element.disciplineId && o.semester == element.semester)[0];

            this.specialtyDisciplineService.delete(disc.id).subscribe();
          });
  
        const addedDisciplines: { disciplineId: number, semester: number }[] = this.semestersDisciplines
          .filter(o => !this.allSemesterDisciplines.some(k => k.disciplineId == o.disciplineId && k.semester == o.semester));

          addedDisciplines.forEach(element => {
          const specialtyDiscipline: ISaveSpecialtyDiscipline = { disciplineId: element.disciplineId,
            semester: element.semester, specialtyId: this.specialty.id };
  
          this.specialtyDisciplineService.create(specialtyDiscipline).subscribe();
        });

        this.specialtyService.update(this.specialty.id, editSpecialty).subscribe(() => {
          this.notificationService.showSuccessMessage("Specialty was successfully updated!");
          this.redirectToManagement();
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