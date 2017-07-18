export class UserHelper {
  static getDisplayName(user) {
    let username = '';
    let mobile = '';
    if (user) {
      username = user.realname || user.username || username;
      mobile = user.mobile || mobile;
    }
    return `${username}（${mobile}）`;
  }

  static resolveMessageTitle(classroom: any = {}, user: any = {}) {
    const classroomName = classroom.name;
    const userName = user.realname || user.username || '';

    return classroomName ? `${classroomName}（${userName}）` : userName;
  }
}
