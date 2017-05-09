import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { SysUser } from "./sys-user";
import 'rxjs/add/operator/toPromise'
import { Observable } from "rxjs/Observable";
import { Page } from "../../../components/page";
import { environment } from "../../../../environments/environment";

@Injectable()
export class SysUserService {
  private userUrl = environment.apiBaseUrl + 'api/sys/users';

  constructor(private http: Http) {
  }

  login(): Observable<any> {
    return this.http.post(`${this.userUrl}/login`, {})
      .map(response => response.json() as any);
  }

  logout(): any[] {
    return [''];
  }

  listAllUsers(): Observable<Page<SysUser>> {
    return this.http.get(this.userUrl)
      .map(response => response.json().data as Page<SysUser>);
  }

  getUser(userId: string): Observable<SysUser> {
    return this.http.get(`${this.userUrl}/${userId}`)
      .map(response => response.json() as SysUser);
  }
}
