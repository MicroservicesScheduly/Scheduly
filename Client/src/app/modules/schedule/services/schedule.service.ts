import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment} from 'src/environments/environment';
import { ISaveSchedule, ISaveScheduleDiscipline, ISchedule, IScheduleDiscipline } from '../models/schedule.model';
import { IDisciplinesRequest } from '../models/disciplinesRequest.model';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {
  constructor(private _http: HttpClient) { }

    get(): Observable<ISchedule[]>{
      return this._http.get<ISchedule[]>(environment.urlPrefix + environment.scheduleUrl);
    }

    getById(id: number): Observable<ISchedule> {
      return this._http.get<ISchedule>(environment.urlPrefix + environment.scheduleUrl + `/${id}`);
    }

    create(schedule: ISaveSchedule) {
      return this._http.post<ISchedule>(environment.urlPrefix + environment.scheduleUrl, schedule);
    } 

    getScheduleDisciplinesByGroupAndSemesterId(request: IDisciplinesRequest) {
      return this._http.post<IScheduleDiscipline[]>(environment.urlPrefix +
        environment.scheduleDisciplineUrl + `/groupsemester`, request);
    } 

    update(id: number, schedule: ISchedule) {
      return this._http.put<ISchedule>(environment.urlPrefix + environment.scheduleUrl + `/${id}`, schedule);
    } 

    delete(id: number) {
      return this._http.delete(environment.urlPrefix + environment.scheduleUrl + `/${id}`);
    }

    createScheduleDiscipline(scheduleDiscipline: ISaveScheduleDiscipline) {
      return this._http.post<IScheduleDiscipline>(environment.urlPrefix + environment.scheduleDisciplineUrl, scheduleDiscipline);
    } 


}
