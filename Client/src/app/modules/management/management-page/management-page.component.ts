import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.css']
})
export class ManagementPageComponent implements OnInit {
  modelName: string = '';
  editModelUri: string = 'management-edit/';

  constructor(private router: Router) { }

  ngOnInit(): void {
    switch (this.router.url)
    {
      case '/management/disciplines':
        this.modelName = "Discipline";
        this.editModelUri += 'create-discipline';
        break;
      case '/management/faculties':
        this.modelName = "Faculty";
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
      this.router.navigateByUrl(this.editModelUri);
    }
  }

}
