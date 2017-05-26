import { animate, state, style, transition, trigger } from '@angular/animations';

export const smoothAnimation = trigger('smoothAnimation', [
  state('in', style({ height: '*', transform: 'translateX(0)', opacity: 1 })),
  transition('void => *', [
    style({ height: 0 }),
    animate(250, style({ height: '*' }))
  ]),
  transition('* => void', [
    style({ height: '*' }),
    animate(250, style({ height: 0 }))
  ])
]);
