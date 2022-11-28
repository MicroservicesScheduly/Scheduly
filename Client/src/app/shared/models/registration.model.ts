export class Registration {
    Email: string;
    Password: string;
    EducationalInstitution: string;
    constructor(email: string, password: string, educInst: string){
        this.Email = email;
        this.Password = password;
        this.EducationalInstitution = educInst;
    }
}
