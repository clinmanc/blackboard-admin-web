import { Auth } from '../shared/auth';

export class AuthHelper {
  static DEFAULT_HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  static auth: Auth = new Auth();

  static get isLoggedIn() {
    return AuthHelper.auth.user;
  }

  static basicAuth(username, password): string {
    return 'Basic ' + btoa(`${username}:${password}`);
  }

  static extendHeaders(header: any = {}): any {
    (header || Object.assign({}, AuthHelper.DEFAULT_HEADER)).Authorization = AuthHelper.auth.token;
    return header;
  }

  static clear() {
    AuthHelper.auth.user = null;
    AuthHelper.auth.token = null;
  }

  static hasPermission(name: string) {
    if (AuthHelper.auth.user) {
      for (const role of AuthHelper.auth.user.roles) {
        for (const permission of role.permissions) {
          if (permission.name === '所有权限' || permission.name === name) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
//
// export function utf8_to_b64(str) {
//   return window.btoa(unescape(encodeURIComponent(str)));
// }
//
// export function b64_to_utf8(str) {
//   return decodeURIComponent(escape(window.atob(str)));
// }
