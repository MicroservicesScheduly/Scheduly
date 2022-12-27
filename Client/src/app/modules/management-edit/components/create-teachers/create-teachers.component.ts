import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISaveTeacher, ITeacher } from 'src/app/modules/management/models/teacher.model';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { TeachersService } from 'src/app/modules/management/services/teachers.service';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-create-teachers',
  templateUrl: './create-teachers.component.html',
  styleUrls: ['./create-teachers.component.css']
})
export class CreateTeachersComponent implements OnInit {

  @Input() teacher: ITeacher = {} as ITeacher;

  id: number;

  private teachers: ITeacher[] = [];

  constructor(private router: Router, private teacherService: TeachersService,
    private route: ActivatedRoute, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 

   this.teacherService.get().subscribe(res => this.teachers = res);

   this.isEditRoute();
  }

  submit(form: NgForm) {
    if (this.teachers.some(p => p.name == form.value["name"] && p.surname == form.value["surname"]
    && p.patronymic == form.value["patronymic"]) && !this.isEditRoute()) {
      this.notificationService.showErrorMessage("Teacher with this name, surname and patronymic already exists!");
    } else if (this.isEditRoute()) {
      var teacher: ITeacher = { name: form.value["name"], surname: form.value["surname"],
      patronymic: form.value["patronymic"], universityId: JSON.parse(localStorage.getItem('selectedEI') as string),
      id: this.id };
  
      this.teacherService.update(this.id, teacher)
      .subscribe(() => {
        this.notificationService.showSuccessMessage("Teacher was successfully updated!");
        this.redirectToManagement();
      });
    } else {
      var saveTeacher: ISaveTeacher = { name: form.value["name"], surname: form.value["surname"],
      patronymic: form.value["patronymic"], universityId: JSON.parse(localStorage.getItem('selectedEI') as string) };
  
      this.teacherService.create(saveTeacher)
      .subscribe(() => {
        this.redirectToManagement();
      });
    }
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/teachers");
  }

  isEditRoute() {
    return this.router.url.includes("edit-");
  }

}
