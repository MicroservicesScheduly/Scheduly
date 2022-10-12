import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.css']
})
export class ManagementPageComponent implements OnInit {
  modelName: string = '';
  lowerModelName: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    switch (this.router.url)
    {
      case '/management/disciplines':
        this.modelName = "Discipline";
        break;
      case '/management/faculties':
          this.modelName = "Faculty";
          break;
      case '/management/teachers':
          this.modelName = "Teacher";
          break;
      case '/management/specialty':
          this.modelName = "Specialty";
          break;
    }
  }

}
