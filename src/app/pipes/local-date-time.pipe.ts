import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime'
})
export class LocalDateTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '';
  }

}
