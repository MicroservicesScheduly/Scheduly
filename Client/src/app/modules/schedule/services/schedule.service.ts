import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment} from 'src/environments/environment';
import { ISaveSchedule, ISaveScheduleDiscipline, ISchedule, IScheduleDiscipline } from '../models/schedule.model';
import { IDisciplinesRequest } from '../models/disciplinesRequest.model';
import { IDisciplinesAddRequest } from '../models/disciplinesRequest.model copy';
import { IDiscipline } from '../../management/models/discipline.model';
import { ITeacherDisciplinesRequest } from '../models/teacherDisciplinesRequest.model';
import { ISubscription } from '../models/subscription.model';
import { IScheduleSubscriptionEmailTemplate } from '../models/subscriptionEmail.model';

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

    getAllScheduleDisciplines(): Observable<IScheduleDiscipline[]>{
      return this._http.get<IScheduleDiscipline[]>(environment.urlPrefix + environment.scheduleDisciplineUrl);
    }

    getScheduleDisciplinesByGroupAndSemesterId(request: IDisciplinesRequest) {
      return this._http.post<IScheduleDiscipline[]>(environment.urlPrefix +
        environment.scheduleDisciplineUrl + `/groupsemester`, request);
    } 

    getDisciplinesToAddBySpecialtyIdAndSemester(request: IDisciplinesAddRequest) {
      return this._http.post<IDiscipline[]>(environment.urlPrefix +
        environment.disciplinesUrl + `/specialtyDisciplines/bySpecialtyAndSemester`, request);
    }

    getTeacherScheduleDisciplinesByGroupAndSemesterId(request: ITeacherDisciplinesRequest) {
      return this._http.post<IScheduleDiscipline[]>(environment.urlPrefix +
        environment.scheduleDisciplineUrl + `/teachersemester`, request);
    } 

    update(id: number, schedule: ISchedule) {
      return this._http.put<ISchedule>(environment.urlPrefix + environment.scheduleDisciplineUrl + `/${id}`, schedule);
    } 

    delete(id: number) {
      return this._http.delete(environment.urlPrefix + environment.scheduleDisciplineUrl + `/${id}`);
    }

    createScheduleDiscipline(scheduleDiscipline: ISaveScheduleDiscipline) {
      return this._http.post<IScheduleDiscipline>(environment.urlPrefix + environment.scheduleDisciplineUrl, scheduleDiscipline);
    } 

    createSubscriptionExternal(subscription: ISubscription) {
      return this._http.post(environment.urlPrefix + 'api/emails', subscription);
    } 

    getAllSubscriptions(): Observable<ISubscription[]> {
      return this._http.get<ISubscription[]>(environment.urlPrefix + 'api/emails');
    } 

    sendEmailsForFilledSchedule(emailData: IScheduleSubscriptionEmailTemplate): Observable<string> {
      return this._http.post<string>(environment.urlPrefix + environment.scheduleUrl + `/sendSubscriptionEmail`, emailData);
    }


}
