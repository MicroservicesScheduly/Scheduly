import { IDiscipline } from "src/app/modules/management/models/discipline.model";
import { IGroup } from "src/app/modules/management/models/group.model";
import { ITeacher } from "src/app/modules/management/models/teacher.model";
import { IScheduleDiscipline } from "src/app/modules/schedule/models/schedule.model";
import { IDialogButton } from "./IDialogButton.model";

export interface IChooseDisciplineDialogData {
    title: string;
    message?: string;
    buttons?: IDialogButton[];
    group: IGroup;
    semester: number;
    day: number;
    lesson: number;
    disciplinesToChoose: IDiscipline[];
    
    choosedDisciplines?: IDiscipline[];
    isLecture?: boolean;
    teacher?: ITeacher;
    catalogName?: string;
    addAsCatalogDisciplines?: boolean;

    scheduleDisciplines?: IScheduleDiscipline[];
}