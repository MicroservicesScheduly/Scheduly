import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-external-schedule-page',
  templateUrl: './external-schedule-page.component.html',
  styleUrls: ['./external-schedule-page.component.css']
})
export class ExternalSchedulePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
