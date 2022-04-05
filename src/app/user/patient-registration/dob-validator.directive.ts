import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appDobValidator]'
})
export class DobValidatorDirective {

  constructor() { }


}

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const today = new Date().getTime();

    if(!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }

    // return null if there's no errors
    return control.value.getTime() > today 
      ? {invalidDate: 'You cannot use future dates' } 
      : null;
  }
}