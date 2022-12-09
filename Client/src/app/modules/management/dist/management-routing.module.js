"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManagementRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var disciplines_component_1 = require("./components/disciplines/disciplines.component");
var faculty_component_1 = require("./components/faculty/faculty.component");
var teachers_component_1 = require("./components/teachers/teachers.component");
var specialties_component_1 = require("./components/specialties/specialties.component");
var management_page_component_1 = require("./management-page/management-page.component");
var routes = [
    {
        path: '',
        component: management_page_component_1.ManagementPageComponent,
        children: [
            {
                path: 'disciplines',
                component: disciplines_component_1.DisciplinesComponent
            },
            {
                path: 'faculties',
                component: faculty_component_1.FacultyComponent
            },
            {
                path: 'teachers',
                component: teachers_component_1.TeachersComponent
            },
            {
                path: 'specialties',
                component: specialties_component_1.SpecialtiesComponent
            },
            {
                path: '**',
                redirectTo: 'faculties'
            },
        ]
    },
];
var ManagementRoutingModule = /** @class */ (function () {
    function ManagementRoutingModule() {
    }
    ManagementRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ManagementRoutingModule);
    return ManagementRoutingModule;
}());
exports.ManagementRoutingModule = ManagementRoutingModule;