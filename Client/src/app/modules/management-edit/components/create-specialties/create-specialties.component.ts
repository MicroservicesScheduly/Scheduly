import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-create-specialties',
  templateUrl: './create-specialties.component.html',
  styleUrls: ['./create-specialties.component.css']
})
export class CreateSpecialtiesComponent implements OnInit {

  @Input() teacher: ISpecialty = {} as ISpecialty;

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
