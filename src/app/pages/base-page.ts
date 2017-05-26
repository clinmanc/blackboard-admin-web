import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';

export class BasePage {
  protected inQuery = false;
  protected completeQueryDelay = 400;

  constructor(protected snackBar: MdSnackBar) { }

  public withHandler<T>(observable: Observable<T>): Observable<T> {
    this.startQuery();
    return observable.do(this.completeQuery.bind(this)).catch(this.handleError.bind(this));
  }

  public startQuery() {
    this.inQuery = true;
  }

  public completeQuery() {
    setTimeout(() => this.inQuery = false, this.completeQueryDelay);
  }

  public handleError(err: Response) {
    this.completeQuery();

    const message = err.json().message || '操作失败';
    this.snackBar.open(message, '知道了', { duration: 5000 });

    return Observable.throw(err);
  }
}
