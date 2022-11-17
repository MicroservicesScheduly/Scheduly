import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { Faculty } from 'src/app/modules/management/models/faculty.model';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  @Input() group: IGroup = {} as IGroup;

  faculties: Faculty[] = [
    { id: 1, name: "Faculty 1", description: "Faculty 1 Dription. Faculty 1 Description. Faulty 1 dssd Desription"},
    { id: 2, name: "Faculty 2", description: "Faculty 2 Dription. Faculty 2 Description. Faulty 2 dssd Desription"},
    { id: 3, name: "Faculty 3", description: "Faculty 3 Dription. Faculty 3 Description. Faulty 3 dssd Desription"}
  ];

  specialties: ISpecialty[] = [
    { id: 1, cipher: "121", description: "Description 1 Description 1 Description 1 Description 1", name: ""},
    { id: 2, cipher: "123", description: "Description 2 Description 2 Description 2 Description 2", name: ""},
    { id: 3, cipher: "126", description: "Description 3 Description 3 Description 3 Description 3", name: ""},
    { id: 4, cipher: "125", description: "Description 4 Description 4 Description 4 Description 4", name: ""}
  ];

  id: number;

  constructor(private router: Router, private groupService: GroupsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 
  }

  submit(form: NgForm) {
    this.groupService.create(form.value)
    .subscribe(() => {
      this.redirectToManagement();
    });
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/faculties");
  }

}