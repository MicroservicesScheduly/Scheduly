export class User {
    id: number;
    email: string;
    educationalInstitution: string='';
    eduInstId: number=0;
    constructor(id:number, email: string, nickname: string, educationalInstitution:string, eduInstId: number=0){
        this.id = id;
        this.email = email,
        this.educationalInstitution = educationalInstitution;
        this.eduInstId = eduInstId;
    }
}
