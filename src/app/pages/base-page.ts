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
    this.snackBar.open(err.message || '查询失败', '知道了', { duration: 5000 });
  }
}
