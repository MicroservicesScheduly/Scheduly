export class Registration {
    Email: string;
    Password: string;
    PasswordRepeat: string;
    /*EducationalInstitution: string;*/
    constructor(email: string, password: string, passwordRepeat: string){
        this.Email = email;
        this.Password = password;
        this.PasswordRepeat = passwordRepeat;
    }
}