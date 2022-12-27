import { User } from "./user.model";

export interface IUserEIFull
{
    userId: number;
    eIId: number;
    isAdmin: boolean;
    isAccepted: boolean;
    isAnswered: boolean;
    user?: User;
    id: number;
}