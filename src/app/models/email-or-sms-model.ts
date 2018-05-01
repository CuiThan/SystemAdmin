export class EmailOrSmsModel
{
    numericalOrder: number;
    id:string;
    type: number;
    messageType: number;
    phoneNumber: string;
    email: string;
    title: string;
    status: number;
    createdDateUtc: Date;
    sendDate: Date;

    content: string;
    model: string;
    template:string;
    updatedDateUtc: Date;
    createdUid: string;
    updatedUid: string;
    verifyId: string;

}