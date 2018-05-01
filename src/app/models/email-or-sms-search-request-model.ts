export class EmailOrSmsSearchRequestModel
{
    type: number;
    messageType: number;
    phoneNumber: string;
    email: string;
    title: string;
    status: number;
    createdDateUtc: Date;
    sendDate: Date;
    pageIndex:number;
    pageSize:number;
}