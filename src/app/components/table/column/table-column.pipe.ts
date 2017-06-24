import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableColumn'
})
export class TableColumnPipe implements PipeTransform {

  transform(key: any, row: any): any {
    if (typeof key === 'string' && key.indexOf('.') > -1) {
      const keys = key.split('.');
      let value = row;
      for (const k of keys) {
        value = value[k];
      }
      return value;
    } else {
      return row[key];
    }
  }
}
