import { Component, EventEmitter, OnInit } from '@angular/core';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-edit-page.component.html',
  styleUrls: ['./management-edit-page.component.css']
})
export class ManagementEditPageComponent implements OnInit {

  constructor(private windowService: WindowService) { }

  ngOnInit(): void {
    this.windowService.openChooseDisciplineTeacherDialog({
      buttons: [
        {
          title: "Cancel",
          onClickEvent: new EventEmitter<void>(), 
        },
      ],
      title: '',
      message: '',
    });
  }

}
