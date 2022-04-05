import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(isDeprecated:boolean): string {
    if(isDeprecated)
      return 'Yes';
    else
return 'No'

}
}

