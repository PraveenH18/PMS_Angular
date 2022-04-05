export class NotesExchanged{
        user: string;
        message: string;
        emailId: string;
        timeStamp: string;
        isUrgent:boolean;

    

    constructor(user:string="", message:string="", timeStamp:string="", emailId:string="", isUrgent:boolean){
        this.user=user
        this.message=message;
        this.timeStamp=timeStamp;
        this.emailId = emailId;
        this.isUrgent = isUrgent;
    
    }
};