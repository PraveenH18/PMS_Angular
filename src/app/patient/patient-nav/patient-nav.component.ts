import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Allergy } from '../model/Allergy';

@Component({
  selector: 'app-patient-nav',
  templateUrl: './patient-nav.component.html',
  styleUrls: ['./patient-nav.component.css']
})
export class PatientNavComponent {

  constructor() { }
 


  public doesPatientHasAllergy:boolean=true;

  public newAllergy:Allergy = new Allergy();

  public allergyNotToBeAdded = ""; 

  

  
  


  
  

 

 

 

}
