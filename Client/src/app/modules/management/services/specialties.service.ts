import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISpecialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  constructor(private _http: HttpClient) { }

    get(): Observable<ISpecialty[]>{
      return this._http.get<ISpecialty[]>(environment.urlPrefix + environment.specialtiesUrl);
    }

    getById(id: number): Observable<ISpecialty> {
      return this._http.get<ISpecialty>(environment.urlPrefix + environment.disciplinesUrl + `/${id}`);
    }
}
