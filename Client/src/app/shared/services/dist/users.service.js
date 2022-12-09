"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = exports.ACCESS_TOKEN = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var tap_1 = require("rxjs/internal/operators/tap");
var user_token_model_1 = require("../models/user-token.model");
var environment_1 = require("src/environments/environment");
exports.ACCESS_TOKEN = 'jwt acces token';
var UsersService = /** @class */ (function () {
    function UsersService(http, jwtHelper, router) {
        this.http = http;
        this.jwtHelper = jwtHelper;
        this.router = router;
        this.options = { headers: new http_1.HttpHeaders().set('Content-Type', 'application/json') };
        this.user = this.getUser(localStorage.getItem(exports.ACCESS_TOKEN));
    }
    UsersService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(environment_1.environment.urlPrefix + environment_1.environment.usersUrl + '/login', {
            Email: email, Password: password
        }, this.options).pipe(tap_1.tap(function (token) {
            localStorage.setItem(exports.ACCESS_TOKEN, token.access_token);
            _this.user = _this.getUser(token.access_token);
        }));
    };
    UsersService.prototype.currentUser = function () {
        return this.user;
    };
    UsersService.prototype.getToken = function () {
        var token = localStorage.getItem(exports.ACCESS_TOKEN);
        if (token === null) {
            return '';
        }
        return token;
    };
    UsersService.prototype.getUserRole = function () {
        return this.user.role;
    };
    UsersService.prototype.isAuthenticated = function () {
        var token = localStorage.getItem(exports.ACCESS_TOKEN);
        if (token !== null && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }
        this.user = new user_token_model_1.UserToken(0, '', '');
        return false;
    };
    UsersService.prototype.register = function (registerModel) {
        return this.http.post(environment_1.environment.urlPrefix + environment_1.environment.usersUrl, registerModel);
    };
    UsersService.prototype.getById = function (id) {
        return this.http.get(environment_1.environment.urlPrefix + environment_1.environment.usersUrl + ("/" + id), this.options);
    };
    UsersService.prototype.get = function () {
        return this.http.get(environment_1.environment.urlPrefix + environment_1.environment.usersUrl, this.options);
    };
    UsersService.prototype.getByRole = function (id) {
        return this.http.get(environment_1.environment.urlPrefix + environment_1.environment.usersUrl + ("/" + id), this.options);
    };
    UsersService.prototype.getRoles = function () {
        return this.http.get(environment_1.environment.urlPrefix + environment_1.environment.usersUrl + "roles", this.options);
    };
    UsersService.prototype.changeRole = function (userId, roleId) {
        return this.http.put(environment_1.environment.urlPrefix + environment_1.environment.usersUrl + (userId + "/role/" + roleId), this.options);
    };
    UsersService.prototype.deleteUser = function (userId) {
        return this.http["delete"](environment_1.environment.urlPrefix + environment_1.environment.usersUrl + ("" + userId));
    };
    UsersService.prototype.logout = function () {
        localStorage.removeItem(exports.ACCESS_TOKEN);
        this.user = this.getUser(localStorage.getItem(exports.ACCESS_TOKEN));
        this.router.navigate(['/']);
    };
    UsersService.prototype.getUser = function (token) {
        var _a;
        if (token === null) {
            return new user_token_model_1.UserToken(0, '', '');
        }
        var user = (_a = this.jwtHelper) === null || _a === void 0 ? void 0 : _a.decodeToken(token);
        var userToken = new user_token_model_1.UserToken(Number(user.id), user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"], user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
        return userToken;
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
