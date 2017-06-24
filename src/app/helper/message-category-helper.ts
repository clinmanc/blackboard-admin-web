export class MessageCategoryHelper {
  static parse(message) {
    let category: string;
    switch (message.category) {
      case 'TOPIC_MESSAGE':
        category = '晓讨论(主消息)';
        break;
      case 'TOPIC':
        category = '晓讨论(内部消息)';
        break;
      case 'SURVEY_MESSAGE':
        category = '晓调查';
        break;
      case 'NOTICE_MESSAGE':
        category = '晓通知';
        break;
      case 'PAPERSLIP':
        category = '晓纸条';
        break;
      case 'ACTIVITY':
        category = '晓活动';
        break;
      default:
        category = '';
    }
    if (!category) {
      if (message.destination === 'PAPERSLIP') {
        category = '晓纸条';
      } else if (message.survey) {
        category = '晓调查';
      } else if (message.activity) {
        category = '晓活动';
      } else {
        category = '晓通知';
      }
    }
    return category;
  }
}
