import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalog } from '../models/catalog.model';
import { ICatalogDiscipline, ISaveCatalogDiscipline } from '../models/catalogDiscipline.model';
import { IDiscipline } from '../models/discipline.model';
import { IFacultySpecialty, ISaveFacultySpecialty } from '../models/facultySpecialty.model';
import { ISpecialty } from '../models/specialty.model';
import { ISaveSpecialtyDiscipline, ISpecialtyDiscipline } from '../models/specialtyDiscipline.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyDisciplineService {
  constructor(private _http: HttpClient) { }

    get():  Observable<ISpecialtyDiscipline[]>{
        return this._http.get<ISpecialtyDiscipline[]>(environment.urlPrefix + environment.specialtyDisciplinesUrl);
    }

    getSpecialtiesByFacultyId(id: number): Observable<ISpecialty[]>{
      return this._http.get<ISpecialty[]>(environment.urlPrefix + environment.specialtyDisciplinesUrl + `/${id}`);
    }

    create(specialtyDiscipline: ISaveSpecialtyDiscipline) {
      return this._http.post<ISpecialtyDiscipline>(environment.urlPrefix + environment.specialtyDisciplinesUrl, specialtyDiscipline);
    } 

    delete(id: number) {
      return this._http.delete(environment.urlPrefix + environment.specialtyDisciplinesUrl + `/${id}`);
    }
}