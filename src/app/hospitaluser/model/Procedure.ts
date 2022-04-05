export class Procedure{
    public procedureCode:string;
    public procedureDescription:string; 
    public isDeprecated:boolean;
    

    constructor(pCode:string="",pDesc:string="",isDeprecated:boolean=false){
        this.procedureCode=pCode
        this.procedureDescription=pDesc;
        this.isDeprecated=isDeprecated;
    }
};