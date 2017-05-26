import { environment } from '../../environments/environment';
import * as _ from 'lodash';

export class AvatarHelper {
  static parseFromUser({ avatar }) {
    let small: string;
    let big: string;
    if (avatar) {
      if (_.startsWith(avatar, 'http://')) {
        small = big = `${environment.imgProxyUrl}?url=${avatar}?defaultImage=touxiang.jpg`;
      } else {
        small = big = `${environment.imgProxyUrl}?url=${environment.fileUrl}/${avatar}`;
      }
    } else {
      small = big = `/assets/img/avatar.png`;
    }
    return {
      small: small,
      big: big,
    };
  }

  static parseFromClassroom({ badgeId, badgeType }) {
    let small: string;
    let big: string;
    if (badgeId) {
      if (_.startsWith(badgeId, 'http://')) {
        small = big = `${environment.imgProxyUrl}?url=${badgeId}?defaultImage=banji.jpg`;
      } else if (badgeType === 'BUILTIN') {
        if (badgeId === 'defaultclass') {
          small = big = `${environment.imgProxyUrl}?url=${environment.builtinImgUrl}/class_logo11.png?defaultImage=banji.jpg`;
        } else {
          small = big = `${environment.imgProxyUrl}?url=${environment.builtinImgUrl}/${badgeId}.png?defaultImage=banji.jpg`;
        }
      } else {
        small = big = `${environment.imgProxyUrl}?url=${environment.fileUrl}/${badgeId}.png&defaultImage=banji.jpg`;
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
