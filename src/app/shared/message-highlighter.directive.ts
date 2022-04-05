import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMessageHighlighter]'
})
export class MessageHighlighterDirective {

  @Input() appMessageHighlighter:boolean =false;

  constructor(private element:ElementRef) {
  }
  ngOnInit(): void {
    if (this.appMessageHighlighter === true){
      this.element.nativeElement.style.color = "red" ;
  }
    }

}
