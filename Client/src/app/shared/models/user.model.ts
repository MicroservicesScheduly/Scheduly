export class User {
    id: number;
    email: string;
    registrationTime?: Date;
    credentialsId?: number;
    roleId?: number;
    roleName?: string;
    /*educationalInstitution: string='';
    eduInstId: number=0;*/
    constructor(id:number, email: string, nickname: string){
        this.id = id;
        this.email = email
        /*this.educationalInstitution = educationalInstitution;
        this.eduInstId = eduInstId;*/
    }
}