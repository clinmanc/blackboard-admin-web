export class UserHelper {
  static getDisplayName(user){
    let username = '';
    let mobile = '';
    if(user){
      username = user.realname || user.username || username;
      mobile = user.mobile || mobile;
    }
    return `${username}（${mobile}）`;
  }
}
