import { environment } from '../../environments/environment';
import * as _ from 'lodash';

export class ResourceHelper {
  static resolveAudioUrl(id: string) {
    return _.startsWith(id, 'http://') ? id : `${environment.audioFileUrl}/${id}/mp3`;
  }

  static resolveVideoUrl(path: string) {
    return _.startsWith(path, 'http://') ? path : `${environment.fileUrl}/${path}`;
  }

  static resolveAvatarUrl(path: string) {
    if (!path) {
      return '/assets/img/avatar.png';
    }
    return _.startsWith(path, 'http://') ? path :
      `${environment.imgProxyUrl}?url=${environment.fileUrl}/${path}.png&defaultImage=default-placeholder.png`;
  }

  static resolveImageUrl(path: string) {
    if (!path) {
      return '/assets/img/default-placeholder.png';
    }
    return _.startsWith(path, 'http://') ? path :
      `${environment.imgProxyUrl}?url=${environment.fileUrl}/${path}.png&defaultImage=default-placeholder.png`;
  }

  static resolveClassroomImageUrl(classroom) {
    if (classroom && classroom.badgeId) {
      if (_.startsWith(classroom.badgeId, 'http://')) {
        return `${environment.imgProxyUrl}?url=${classroom.badgeId}&defaultImage=banji.jpg`;
      } else if (classroom.badgeType === 'BUILTIN') {
        if (classroom.badgeId === 'defaultclass') {
          return `${environment.imgProxyUrl}?url=${environment.builtinImgUrl}/class_logo11.png&defaultImage=banji.jpg`;
        } else {
          return `${environment.imgProxyUrl}?url=${environment.builtinImgUrl}/${classroom.badgeId}.png&defaultImage=banji.jpg`;
        }
      } else {
        return `${environment.imgProxyUrl}?url=${environment.fileUrl}/${classroom.badgeId}.png&defaultImage=banji.jpg`;
      }
    } else {
      return '/assets/img/classroom.jpg';
    }
  }

  static resolveUserImageUrl(user) {
    if (user && user.avatar) {
      if (_.startsWith(user.avatar, 'http://')) {
        return `${environment.imgProxyUrl}?url=${user.avatar}&defaultImage=touxiang.jpg`;
      } else {
        return `${environment.imgProxyUrl}?url=${environment.fileUrl}/${user.avatar}`;
      }
    } else {
      return `/assets/img/avatar.png`;
    }
  }
}
