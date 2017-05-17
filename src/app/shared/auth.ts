import { SysUser } from "./sys-user";

export class Auth {
  user: SysUser;
  _token: string;


  set token(token: string) {
    this._token = token;
    if (this._token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }

  get token() {
    return this._token || (this._token = sessionStorage.getItem("token"));
  }
}
