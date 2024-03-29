// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  facultyUrl: 'api/faculties',
  teachersUrl: 'api/teachers',
  specialtiesUrl: 'api/specialties',
  disciplinesUrl: 'api/disciplines',
  catalogsUrl: 'api/disciplines/catalogs',
  groupsUrl: 'api/groups',
  catalogDisciplinesUrl: 'api/disciplines/catalogDisciplines',
  disciplineTeachersUrl: 'api/teachers/disciplineTeachers',
  specialtyDisciplinesUrl: 'api/disciplines/specialtyDisciplines',
  facultySpecialtyUrl: 'api/specialties/facultySpecialties',
  facultyDisciplineUrl: 'api/disciplines/facultyDisciplines',
  facultyTeacherUrl: 'api/teachers/facultyTeachers',
  usersUrl: 'api/users',
  scheduleUrl: 'api/schedule',
  scheduleDisciplineUrl: 'api/schedule/disciplines',
  whiteListedDomains: [''],
  urlPrefix: 'http://192.168.59.149/',
};

export const HEADERS = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
