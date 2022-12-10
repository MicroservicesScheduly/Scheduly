export interface ITeacher {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    universityId: number;
}

export interface ISaveTeacher {
    name: string;
    surname: string;
    patronymic: string;
    universityId: number;
}
