import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Specialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  constructor(private _http: HttpClient) { }

    get(): Observable<Specialty[]>{
      return this._http.get<Specialty[]>(environment.urlPrefix + environment.specialtiesUrl);
    }
}
