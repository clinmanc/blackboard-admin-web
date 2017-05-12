export class AvatarHelper {
  static BUILTIN_IMG_URL: string = 'http://www.xiaoheiban.cn/Public/banhui';
  static IMG_URL = 'http://file.xiaoheiban.cn';

  static parseFromUser({avatar}) {
    let small: string;
    let big: string;
    if (avatar) {
      small = big = `${AvatarHelper.IMG_URL}/${avatar}`;
    } else {
      small = big = `/assets/img/avatar.png`;
    }
    return {
      small: small,
      big: big,
    };
  }

  static parseFromSchool({badgeId, badgeType}) {
    let small: string;
    let big: string;
    if (badgeId) {
      if (badgeType == 'BUILTIN') {
        if (badgeId == 'defaultclass') {
          small = big = `${AvatarHelper.BUILTIN_IMG_URL}/class_logo11.png`;
        } else {
          small = big = `${AvatarHelper.IMG_URL}/${badgeId}.png`;
        }
      } else {
        small = big = `${AvatarHelper.IMG_URL}/${badgeId}`;
      }
    } else {
      small = big = `/assets/img/classroom.jpg`;
    }
    return {
      small: small,
      big: big
    };
  }
}
