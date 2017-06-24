// import { environment } from '../../environments/environment';
// import * as _ from 'lodash';
//
// enum ImageType {
//   BUILTIN, AVATAR
// }
//
// export function resolveImageUrl (path: string, type: ImageType, defaultImage: string) {
//   let url;
//   if (_.startsWith('http://')) {
//     url = path;
//   } else {
//     if (type === ImageType.BUILTIN) {
//       url = `${environment.builtinImgUrl}`;
//     } else if (type === ImageType.AVATAR) {
//       url = `${environment.fileUrl}`;
//     }
//   }
//   return `${environment.imgProxyUrl}?url=${url}&defaultImage=${defaultImage}`;
// }
//
// export function resolveClassroomImageUrl ({ badgeId, badgeType }) {
//   if (badgeId) {
//     if (_.startsWith(badgeId, 'http://')) {
//       return resolveImageUrl(badgeId, ImageType.AVATAR, 'banji.jpg');
//     } else if (badgeType === 'BUILTIN') {
//       if (badgeId === 'defaultclass') {
//         return resolveImageUrl('class_logo11.png', ImageType.BUILTIN, 'banji.jpg');
//       } else {
//         return resolveImageUrl(`${badgeId}.png`, ImageType.BUILTIN, 'banji.jpg');
//       }
//     } else {
//       return resolveImageUrl(`${badgeId}.png`, ImageType.AVATAR, 'banji.jpg');
//     }
//   } else {
//     return `/assets/img/classroom.jpg`;
//   }
// }
//
// export function resolveUserImageUrl ({ avatar }) {
//   let small: string;
//   let big: string;
//   if (avatar) {
//     if (_.startsWith(avatar, 'http://')) {
//       small = big = `${environment.imgProxyUrl}?url=${avatar}&defaultImage=touxiang.jpg`;
//     } else {
//       small = big = `${environment.imgProxyUrl}?url=${environment.fileUrl}/${avatar}`;
//     }
//   } else {
//     small = big = `/assets/img/avatar.png`;
//   }
//   return {
//     small: small,
//     big: big,
//   };
// }
//
// }
