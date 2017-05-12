import { Request, Response } from '@angular/http';
import {Resource, ResourceActionBase, ResourceCRUD} from 'ngx-resource';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';


export class RestClient extends Resource {
  // getHeaders(methodOptions?: any): any {
  //   const headers: any = {};
  //
  //   if (environment.auth && methodOptions.auth) {
  //     headers.Authorization = localStorage.get('token');
  //   }
  //
  //   return headers;
  // }
  //
  getUrl(methodOptions?: any): string | Promise<string> {
    const resPath = super.getUrl();
    return environment.url + resPath;
  }
  //
  // responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any> {
  //   return Observable.create((subscriber: Subscriber<any>) => {
  //
  //     observable.subscribe(
  //       (res: Response) => {
  //         if (res.headers) {
  //           const newToken: string = res.headers.get('Authorization');
  //           if (newToken) {
  //             localStorage.setItem('token', newToken);
  //           }
  //         }
  //         subscriber.next((<any>res)._body ? (res.json() as any).data : null);
  //       },
  //       (error: Response) => {
  //         // I also made a layer to parse errors
  //         subscriber.error(new Error(String(error)));
  //       },
  //       () => subscriber.complete()
  //     );
  //
  //   });
  // }
}
