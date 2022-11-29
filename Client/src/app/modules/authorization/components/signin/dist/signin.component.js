"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SigninComponent = void 0;
var core_1 = require("@angular/core");
var login_model_1 = require("src/app/shared/models/login.model");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(router, route, usersService) {
        this.router = router;
        this.route = route;
        this.usersService = usersService;
        this.loginModel = new login_model_1.Login('', '');
    }
    SigninComponent.prototype.ngOnInit = function () {
    };
    SigninComponent.prototype.redirectToManagement = function () {
        this.router.navigateByUrl("/management/faculties");
    };
    SigninComponent.prototype.login = function () {
        var _this = this;
        this.usersService.login(this.loginModel.Email, this.loginModel.Password).subscribe(function (result) { _this.router.navigate(['/management/faculties']); });
    };
    SigninComponent.prototype.isAuthenticated = function () {
        return this.usersService.isAuthenticated();
    };
    SigninComponent.prototype.logout = function () {
        this.usersService.logout();
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.css']
        })
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
