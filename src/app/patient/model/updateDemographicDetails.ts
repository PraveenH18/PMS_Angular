import { Allergy } from "./Allergy";

export class UpdateDemographicDetails{
    firstName:string='';
    lastName:string='';
    age:string='';
    ethnicity:string='';
    languagesKnown:string='';
    address:string='';
    countryCode:string='';
    contactNo:string='';
    emergencyTitle:string='';
    emergencyFirstName:string='';
    emergencyLastName:string='';
    relationship:string='';
    emergencyContact:string='';
    emergencyAddress:string='';
    hasAccess:string='';
    patientAllergies: Allergy[]=[];
}