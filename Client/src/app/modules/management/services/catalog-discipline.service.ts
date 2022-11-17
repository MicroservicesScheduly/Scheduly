import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalog } from '../models/catalog.model';
import { ICatalogDiscipline, ISaveCatalogDiscipline } from '../models/catalogDiscipline.model';
import { IDiscipline } from '../models/discipline.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogDisciplineService {
  constructor(private _http: HttpClient) { }

    getDisciplinesByCatalogId(id: number): Observable<IDiscipline[]>{
      return this._http.get<IDiscipline[]>(environment.urlPrefix + environment.catalogDisciplinesUrl + `/${id}`);
    }

    create(catalogDiscipline: ISaveCatalogDiscipline) {
      return this._http.post<ICatalogDiscipline>(environment.urlPrefix + environment.catalogDisciplinesUrl, catalogDiscipline);
    } 
}