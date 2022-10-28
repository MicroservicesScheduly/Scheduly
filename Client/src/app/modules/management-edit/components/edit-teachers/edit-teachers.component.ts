import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { TeachersService } from 'src/app/modules/management/services/teachers.service';


@Component({
  selector: 'app-edit-teachers',
  templateUrl: './edit-teachers.component.html',
  styleUrls: ['./edit-teachers.component.css']
})
export class EditTeachersComponent implements OnInit {

  teacher: ITeacher;

  id: number;
  
  constructor(private teachersService: TeachersService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 
  }

  ngOnInit(): void {
    this.teachersService.getById(this.id).subscribe(res => this.teacher = res);
  }
}
