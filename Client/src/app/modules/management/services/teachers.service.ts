import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TEACHERS_API_URL } from '../app-injection';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  constructor(
    private _http: HttpClient,
    @Inject(TEACHERS_API_URL) private teachersUrl: string
    ) { }

    get(): Observable<Teacher[]>{
      return this._http.get<Teacher[]>(this.teachersUrl);
    }
}
