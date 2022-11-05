import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Faculty } from 'src/app/modules/management/models/faculty.model';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';


@Component({
  selector: 'app-edit-faculties',
  templateUrl: './edit-faculties.component.html',
  styleUrls: ['./edit-faculties.component.css']
})
export class EditFacultiesComponent implements OnInit {

  faculty: Faculty;

  id: number;
  
  constructor(private facultiesService: FacultyService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 
  }

  ngOnInit(): void {
    this.facultiesService.getById(this.id).subscribe(res => this.faculty = res);
  }
}
