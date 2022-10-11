import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faculty } from '../models/faculty.model';
import { Observable } from 'rxjs/internal/Observable';
import { FACULTIES_API_URL } from '../app-injection';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  constructor(
    private _http: HttpClient,
    @Inject(FACULTIES_API_URL) private facultiesUrl: string
    ) { }

    get(): Observable<Faculty[]>{
      return this._http.get<Faculty[]>(this.facultiesUrl);
    }
}
