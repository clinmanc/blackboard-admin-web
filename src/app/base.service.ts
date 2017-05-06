import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export abstract class BaseService<T, I> {
  config: string;
  headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  create(t: T): Observable<T> {
    return this.http.post(this.config, JSON.stringify(t), this.headers)
      .map(resp => resp.json() as T);
  }

  delete(id: I): void {
    this.http.delete(this.config);
  }

  update(t: T): Observable<T> {
    return this.http.patch(this.config, JSON.stringify(t), this.headers)
      .map(resp => resp.json() as T);
  }

  listAll(): Observable<T[]> {
    return this.http.get(this.config)
      .map(resp => resp.json() as T[]);
  }

  get(id: I): Observable<T> {
    return this.http.get(this.config)
      .map(resp => resp.json() as T);
  }
}
