import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blackboardMessage'
})
export class BlackboardMessagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return typeof value === 'string' ? value.replace(/<br>/g, '\n') : value;
  }

}
