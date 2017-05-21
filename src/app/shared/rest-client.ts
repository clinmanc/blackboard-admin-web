import { Http, Headers, Request, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Resource, ResourceActionBase } from 'ngx-resource';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Injectable } from '@angular/core';
import { AuthHelper } from '../helper/authorization-helper';

@Injectable()
export class RestClient extends Resource {
  private resourcePath: string | Promise<string>;

  constructor(http: Http, private router: Router) {
    super(http);
  };


  requestInterceptor(req: Request, methodOptions?: ResourceActionBase): Request {
    req.withCredentials = true;
    return req;
  }

  getHeaders(methodOptions?: any): any {
    let headers = super.getHeaders();

    if (!environment.noAuth && !methodOptions.noAuth) {
      headers = AuthHelper.extendHeaders(headers);
    }

    return headers;
  }

  getUrl(methodOptions?: any): string | Promise<string> {
    this.resourcePath = super.getUrl();
    return environment.url + this.resourcePath;
  }

  getResourcePath(methodOptions?: any): string | Promise<string> {
    return super.getUrl();
  }

  responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any> {

    return Observable.create((subscriber: Subscriber<any>) => {

      observable.subscribe(
        (res: Response) => {
          if (res.headers) {
            const newToken: string = res.headers.get('Authorization');
            if (newToken) {
              AuthHelper.auth.token = newToken;
            }
          }
          subscriber.next((<any>res)._body ? res.json() : null);
          // subscriber.next((<any>res)._body ? (res.json() as any).data : null);
        },
        (error: Response) => {
          if (error.status === 401) {
            AuthHelper.clear();
            this.router.navigate(['/login']);
          }
          // I also made a layer to parse errors
          subscriber.error(error);
        },
        () => subscriber.complete()
      );

    });
  }
}
