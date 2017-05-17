import { Injectable } from '@angular/core';
import { RequestMethod, Headers } from '@angular/http';
import { ResourceAction, ResourceParams } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { RestClient } from './shared/rest-client';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AuthHelper } from './helper/authorization-helper';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

interface LoginInfo {
  username: string;
  password: string;
  rememberMe?: boolean;
}

@Injectable()
@ResourceParams({
  url: '/auth'
})
export class AuthService extends RestClient {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  @ResourceAction({
    path: '/login',
    method: RequestMethod.Post,
    withCredentials: true
  })
  private doLogin: ResourceMethod<LoginInfo, any>;
  // login(userInfo): Observable<SysUser> {
  //   // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  //   return null;
  // }
  login(loginInfo?: LoginInfo): Observable<any> {
    if (loginInfo) {
      // const salt = genSaltSync(10);
      // const hash = hashSync(loginInfo.password, salt);
      // console.log(compareSync('admin', '$2a$10$YhouJdfAl82NCT24NL47Ve38JgVOsO.5God7zPiv1YlR1iwUntyf2'));
      // console.log(Date.now());
      AuthHelper.auth.token = AuthHelper.basicAuth(loginInfo.username, loginInfo.password);
    }
    return this.doLogin(loginInfo).$observable.map((user => {
      AuthHelper.auth.user = user;
      return true;
    }));
  }

  doLogout: ResourceMethod<void, any>;

  @ResourceAction({
    path: '/logout'
  })
  logout(): void {
    AuthHelper.clear();
  }

  getUrl(methodOptions?: any): string | Promise<string> {
    return environment.authUrl + this.getResourcePath();
  }
}
