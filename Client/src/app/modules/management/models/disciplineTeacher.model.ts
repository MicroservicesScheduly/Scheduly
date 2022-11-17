export interface IDisciplineTeacher {
    id: number;
    teacherId: number;
    disciplineId: number;
    isLecturer: boolean;
}

export interface ISaveDisciplineTeacher {
    teacherId: number;
    disciplineId: number;
    isLecturer: boolean;
}