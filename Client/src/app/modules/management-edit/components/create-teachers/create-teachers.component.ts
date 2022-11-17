import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
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

  constructor(private router: Router, private teacherService: TeachersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 

   this.isEditRoute();
  }

  submit(form: NgForm) {
    this.teacherService.create(form.value)
    .subscribe(() => {
      this.redirectToManagement();
    });
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/teachers");
  }

  isEditRoute() {
    return this.router.url.includes("edit-");
  }

}
