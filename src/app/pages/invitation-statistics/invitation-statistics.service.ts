import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";
import { Http, URLSearchParams } from "@angular/http";
import { Pageable } from "../../components/pageable";
import { isNullOrUndefined } from "util";
import { Page } from "../../components/page";

@Injectable()
export class InvitationStatisticsService {
  private invitationUrl = environment.apiBaseUrl + 'api/invitation';

  constructor(private http: Http) { }

  searchStatistics(invitationCodes: string, from: string, to: string, page?: Pageable): Observable<Page<any>> {
    const url = `${this.invitationUrl}/statistics`;

    const params = new URLSearchParams();
    params.set('invitationCodes', invitationCodes);
    params.set('from', from);
    params.set('to', to);
    if (!isNullOrUndefined(page)) {
      params.set('page', String(page.page));
      params.set('size', String(page.size));
      params.set('direction', page.direction);
      for (let field of page.sort) {
        params.append('sort', field);
      }
    }

    return this.http.get(url, { search: params })
      .map(response => response.json() as Page<any>);
  }

  listTeachers(invitationCode: string, from: string, to: string): Observable<any> {
    const url = `${this.invitationUrl}/teachers`;

    return this.listItems(url, invitationCode, from, to);
  }

  listClassrooms(invitationCode: string, from: string, to: string): Observable<any> {
    const url = `${this.invitationUrl}/classrooms`;

    return this.listItems(url, invitationCode, from, to);
  }

  listMembers(invitationCode: string, from: string, to: string): Observable<any> {
    const url = `${this.invitationUrl}/members`;

    return this.listItems(url, invitationCode, from, to);
  }

  private listItems(url: string, invitationCode: string, from: string, to: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('invitationCode', invitationCode);
    params.set('from', from);
    params.set('to', to);

    return this.http.get(url, { search: params })
      .map(response => response.json() as any[]);
  }

  exportRecords(): Observable<any> {
    const url = `${this.invitationUrl}/export`;

    return this.http.post(url, null);
  }
}
