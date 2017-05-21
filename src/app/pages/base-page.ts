import { MdSnackBar } from '@angular/material';
import {Observable} from "rxjs/Observable";

export class BasePage {
  protected inQuery = false;
  protected completeQueryDelay = 1000;

  constructor(protected snackBar: MdSnackBar) { }

  public startQuery() {
    this.inQuery = true;
  }

  public subscribeQuery(observable: Observable<any>) {
    this.startQuery();
    observable.subscribe(this.completeQuery.bind(this), err => {
      this.completeQuery();
      this.handleError(err);
    });
    return observable;
  }

  public completeQuery() {
    setTimeout(() => this.inQuery = false, this.completeQueryDelay);
  }

  handleError(err: any) {
    this.completeQuery();

    const json: any = err._body && err.json();
    const error = json && json.message || '操作失败';

    this.snackBar.open(error, '知道了', { duration: 5000 });
  }
}
