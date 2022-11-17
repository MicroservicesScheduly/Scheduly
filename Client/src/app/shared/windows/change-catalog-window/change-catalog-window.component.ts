import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';

@Component({
  selector: 'app-change-catalog-window',
  templateUrl: './change-catalog-window.component.html',
  styleUrls: ['./change-catalog-window.component.css']
})
export class ChangeCatalogWindowComponent implements OnInit {
  
  catalogs: ICatalog[] = [];

  /*catalog: ICatalog = {} as ICatalog;*/

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogData,
      private dialogRef: MatDialogRef<ChangeCatalogWindowComponent>,
      private catalogsService: CatalogsService,
      private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.catalogsService.get().subscribe(res => this.catalogs = res);
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }

  changeCatalog(id: number) {
    if(this.data.disciplineForCatalog) {
      /* PASS THIS DISCIPLINE ID AND id: number of catalog /parameter/ */
    }
  }

  /*addNewCatalog(form: NgForm) {
    this.catalogsService.create(form.value)
    .subscribe(() => {
      this.dialogRef.close();
      this.notificationService.showSuccessMessage("New catalog was added successfully");
    });
  }*/
}
