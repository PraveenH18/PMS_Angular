export class AppointmentDetails{
   public subject:string='';
   public  startTime:string='';
   public  endTime:string='';
   public patientId:number=0;
   public physicianId:number=0;
   public status:string='';
   public description:string='';
   public  id:number=0;
	public	createdById:number=0;
	public  creatorName:string='';
	public  block:boolean=false; 
	public  readonly:boolean=false;
   public edited:boolean=false;
   public reason:string="";   
};