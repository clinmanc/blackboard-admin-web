import { MdSnackBar } from '@angular/material';

export class BasePage {
  protected inQuery = false;
  protected completeQueryDelay = 1000;

  constructor(protected snackBar: MdSnackBar) { }

  public startQuery() {
    this.inQuery = true;
  }

  public completeQuery() {
    setTimeout(() => this.inQuery = false, this.completeQueryDelay);
  }

  handleError(err: any) {
    this.completeQuery();

    let message;

    if (err.status === 400) {
      message = '错误请求';
    } else if (err.status === 401) {
      message = '需要授权';
    } else if (err.status === 403) {
      message = '禁止访问';
    } else if (err.status === 500) {
      message = '服务器错误';
    } else {
      message = err.message || `${err.status || ''} 查询失败`;
    }

    this.snackBar.open(message, '知道了', { duration: 5000 });
  }
}
