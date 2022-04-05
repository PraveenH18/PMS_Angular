import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appStatusHighLighter]'
})
export class StatusHighLighterDirective {
  @Input() appStatusHighLighter:string ="";

  constructor(private element:ElementRef) {
  }
  ngOnInit(): void {
    if (this.appStatusHighLighter == ""){
      this.appStatusHighLighter = "rgb(168, 166, 166)";   
    }
    this.element.nativeElement.style.backgroundColor = this.appStatusHighLighter ;
  }
}
