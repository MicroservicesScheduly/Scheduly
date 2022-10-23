import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DISCIPLINES_API_URL } from '../app-injection';
import { IDiscipline } from '../models/discipline.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {
  constructor(
    private _http: HttpClient,
    @Inject(DISCIPLINES_API_URL) private disciplinesUrl: string
    ) { }

    get(): Observable<IDiscipline[]>{
      return this._http.get<IDiscipline[]>(this.disciplinesUrl);
    }
}
