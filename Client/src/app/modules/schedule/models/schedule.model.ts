export interface ISchedule {
    id: number;
    groupId: number;
}

export interface ISaveSchedule {
    groupId: number;
}

export interface IScheduleDiscipline {
    id: number;
    teacherId: number;
    teacherName: string;
    day: number;
    semester: number;
    lesson: number;
    scheduleId: number;
    isLecture: boolean;
    disciplineId: number;
    disciplineName?: string;
    isSelective?: boolean;
    catalogName?: string;
}

export interface ISaveScheduleDiscipline {
    teacherId: number;
    teacherName: string;
    day: number;
    semester: number;
    lesson: number;
    scheduleId: number;
    isLecture: boolean;
    disciplineId: number;
    disciplineName?: string;
    isSelective?: boolean;
    catalogName?: string;
}
