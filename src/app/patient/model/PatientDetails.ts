import { Allergy } from "./Allergy";

export class PatientDetails{
  
    public address:string='';
    public countryCode:string='';
    public emergencyAddress:string='';
    public emergencyContactNo:string='';
    public emergencyFirstName:string='';
    public emergencyLastName:string='';
    public emergencyTitle:string='';
    public ethnicity:string='';
    public hasAccess:string='';
    public languagesKnown:string='';
    public patientAllergies: Allergy[]=[];
    public race:string='';
    public relationship:string='';
    
  
  }
