"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthorizationModule = exports.getToken = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var header_module_1 = require("src/app/shared/header/header.module");
var registration_component_1 = require("./components/registration/registration.component");
var signin_component_1 = require("./components/signin/signin.component");
var authorization_page_component_1 = require("./authorization-page/authorization-page.component");
var authorization_routing_module_1 = require("./authorization-routing.module");
var users_service_1 = require("src/app/shared/services/users.service");
// import { JwtModule } from '@auth0/angular-jwt/lib/angular-jwt.module';
// import { JwtHelperService } from '@auth0/angular-jwt/lib/jwthelper.service';
// import { JWT_OPTIONS } from '@auth0/angular-jwt/lib/jwtoptions.token';
var angular_jwt_1 = require("@auth0/angular-jwt");
function getToken() {
    return localStorage.getItem(users_service_1.ACCESS_TOKEN);
}
exports.getToken = getToken;
var AuthorizationModule = /** @class */ (function () {
    function AuthorizationModule() {
    }
    AuthorizationModule = __decorate([
        core_1.NgModule({
            declarations: [
                authorization_page_component_1.AuthorizationPageComponent,
                registration_component_1.RegistrationComponent,
                signin_component_1.SigninComponent,
            ],
            imports: [
                common_1.CommonModule,
                authorization_routing_module_1.AuthorizationRoutingModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                header_module_1.HeaderModule,
                angular_jwt_1.JwtModule.forRoot({
                    config: {
                        tokenGetter: getToken,
                        allowedDomains: ["localhost:7265"]
                    }
                })
            ],
            providers: [users_service_1.UsersService,
                { provide: angular_jwt_1.JWT_OPTIONS, useValue: angular_jwt_1.JWT_OPTIONS },
                angular_jwt_1.JwtHelperService]
        })
    ], AuthorizationModule);
    return AuthorizationModule;
}());
exports.AuthorizationModule = AuthorizationModule;
