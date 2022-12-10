import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISaveSpecialty, ISpecialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  constructor(private _http: HttpClient) { }

    get(): Observable<ISpecialty[]>{
      return this._http.get<ISpecialty[]>(environment.urlPrefix + environment.specialtiesUrl);
    }

    getById(id: number): Observable<ISpecialty> {
      return this._http.get<ISpecialty>(environment.urlPrefix + environment.specialtiesUrl + `/${id}`);
    }

    getByEIId(id: number): Observable<ISpecialty[]> {
      return this._http.get<ISpecialty[]>(environment.urlPrefix + environment.specialtiesUrl + `/byEI/${id}`);
    }

    create(specialty: ISaveSpecialty) {
      return this._http.post<ISpecialty>(environment.urlPrefix + environment.specialtiesUrl, specialty);
    } 

    update(id: number, specialty: ISpecialty) {
      return this._http.put<ISpecialty>(environment.urlPrefix + environment.specialtiesUrl + `/${id}`, specialty);
    } 

    delete(id: number) {
      return this._http.delete(environment.urlPrefix + environment.specialtiesUrl + `/${id}`);
    }
}
