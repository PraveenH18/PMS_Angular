export class User{
    public userId:number;
    public firstName:string;
    public lastName:string;
    public emailId:string; 
    public role:string; 
    constructor(userId=0, firstName:string="", lastName:string="", emailId:string="", role:string=""){
        this.userId=userId;
        this.firstName=firstName;
        this.lastName=lastName;
        this.role=role;
        this.emailId = emailId;
    
    }  
      
};