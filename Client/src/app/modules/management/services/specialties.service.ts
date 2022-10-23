import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SPECIALTIES_API_URL } from '../app-injection';
import { Specialty } from '../models/specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {
  constructor(
    private _http: HttpClient,
    @Inject(SPECIALTIES_API_URL) private specialtiesUrl: string
    ) { }

    get(): Observable<Specialty[]>{
      return this._http.get<Specialty[]>(this.specialtiesUrl);
    }
}
