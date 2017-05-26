import { animate, state, style, transition, trigger } from '@angular/animations';

export const shrinkInOutAnimation = trigger('shrinkInOutAnimation', [
  state('out', style({ height: '*' })), // 默认元素不展开
  transition(':enter', [
    style({ height: 0 }),
    animate(250, style({ height: '*', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ height: '*', opacity: 1 }),
    animate(250, style({ height: 0, opacity: 0 }))
  ]),
]);
