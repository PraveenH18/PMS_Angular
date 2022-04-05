export class Medication{
    public drugCode:string;
    public drugForm:string;
    public drugName:string;
    public drugStrength:string;
    public drugGenericName:string="";
    public drugBrandName:string="";
    

    constructor(drug_id:string="",drug_form:string="",Drug_name:string="",Drug_strength:string=""){
        this.drugCode=drug_id;
        this.drugForm=drug_form;
        this.drugName=Drug_name;
        this.drugStrength=Drug_strength;
    }
};