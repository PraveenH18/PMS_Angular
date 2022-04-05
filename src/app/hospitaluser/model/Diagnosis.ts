export class Diagnosis{
    public diagnosisCode:string;
    public diagnosisDescription:string; 
    public isDeprecated:boolean;
    

    constructor(code:string="",desc:string="",isDeprecated:boolean=false){
        this.diagnosisCode=code
        this.diagnosisDescription=desc;
        this.isDeprecated=isDeprecated;
    }
};