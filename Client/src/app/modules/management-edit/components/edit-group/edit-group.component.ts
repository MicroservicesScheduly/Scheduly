import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Faculty } from 'src/app/modules/management/models/faculty.model';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { GroupsService } from 'src/app/modules/management/services/groups.service';


@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  group: IGroup;

  id: number;
  
  constructor(private facultiesService: FacultyService, private route: ActivatedRoute,
    private groupService: GroupsService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 
  }

  ngOnInit(): void {
    this.groupService.getById(this.id).subscribe(res => this.group = res);
  }
}
