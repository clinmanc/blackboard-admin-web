import { environment } from '../../environments/environment';
import { Pageable } from '../components/pageable';
import { Observable } from 'rxjs/Observable';
import { Page } from '../components/page';
import { isNullOrUndefined } from 'util';
import { Http, URLSearchParams } from '@angular/http';

export class BaseService<T> {
  protected url: string;

  constructor(protected http: Http, url: string) {
    this.url = environment.apiBaseUrl + url;
  }

  listAll(pageable?: Pageable): Observable<Page<T>> {
    const params = new URLSearchParams();
    if (!isNullOrUndefined(pageable)) {
      params.set('page', String(pageable.page));
      params.set('size', String(pageable.size));
      params.set('direction', pageable.direction);
      for (let field of pageable.sort) {
        params.append('sort', field);
      }
    }
    return this.http.get(this.url, { search: params })
      .map(response => response.json() as Page<T>);
  }

  delete(id: string): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete(url)
      .map(response => response.json() as any);
  }

  get(id: string): Observable<T> {
    const url = `${this.url}/${id}`;

    return this.http.get(url)
      .map(response => response.json() as T);
  }
}
