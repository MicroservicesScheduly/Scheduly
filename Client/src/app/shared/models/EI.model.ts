export class EI {
    id: number;
    name: string;
    link?: string;
}

export class SaveEI {
    name: string;
}

export class SaveUserEI {
    userId: number;
    eiId: number;
    isAccepted: boolean;
    isAdmin: boolean;
}