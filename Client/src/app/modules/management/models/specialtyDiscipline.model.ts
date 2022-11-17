export interface ISpecialtyDiscipline {
    id: number;
    specialtyId: number;
    disciplineId: number;
    semester: number;
}

export interface ISaveSpecialtyDiscipline {
    specialtyId: number;
    disciplineId: number;
    semester: number;
}