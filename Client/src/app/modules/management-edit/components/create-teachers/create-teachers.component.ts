import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-create-teachers',
  templateUrl: './create-teachers.component.html',
  styleUrls: ['./create-teachers.component.css']
})
export class CreateTeachersComponent implements OnInit {

  @Input() teacher: ITeacher = {} as ITeacher;

  constructor(private router: Router, private windowService: WindowService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    /* ADD submit action */
    this.redirectToManagement();
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management");
  }

}
