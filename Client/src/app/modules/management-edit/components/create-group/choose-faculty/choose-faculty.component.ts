import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { Faculty } from 'src/app/modules/management/models/faculty.model';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { IFacultySpecialty } from 'src/app/modules/management/models/facultySpecialty.model';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';
import { FacultySpecialtyService } from 'src/app/modules/management/services/faculty-specialty.service';

@Component({
  selector: 'app-choose-faculty',
  templateUrl: './choose-faculty.component.html',
  styleUrls: ['./choose-faculty.component.css']
})
export class ChooseFacultyComponent implements OnInit {

  @Input() group: IGroup = {} as IGroup;

  faculties: Faculty[] = [];

  @Output() newItemEvent = new EventEmitter<number>();

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {

    this.facultyService.get().subscribe(res => {
      this.faculties = res;
    });
  }

   addNewItem(value: number) {
    this.newItemEvent.emit(value);
  }
}