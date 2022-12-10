import { EI } from "./EI.model";

export class User {
    id: number;
    email: string;
    registrationTime?: Date;
    credentialsId?: number;
    roleId?: number;
    roleName?: string;
    eis?: EI[];
    constructor(id:number, email: string, nickname: string){
        this.id = id;
        this.email = email
    }
}