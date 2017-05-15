import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageCategoryPipe'
})
export class MessageCategoryPipe implements PipeTransform {

  transform(value: any, survey?: any): any {
    let title: string;
    switch (value) {
      case 'TOPIC_MESSAGE':
        title = '晓讨论(主消息)';
        break;
      case 'TOPIC':
        title = '晓讨论(内部消息';
        break;
      case 'SURVEY_MESSAGE':
        title = '晓调查)';
        break;
      case 'NOTICE_MESSAGE':
        title = '晓通知';
        break;
      case 'PAPERSLIP':
        title = '晓纸条';
        break;
      default:
        title = '';
    }
    if (!title && survey) {
      title = '晓调查';
    } else {
      title = '晓通知';
    }

    return title;
  }

}
